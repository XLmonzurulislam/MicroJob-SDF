import express, { Request, Response, NextFunction } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertTaskSchema,
  insertTestimonialSchema,
  insertPageContentSchema,
  TaskStatusEnum,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

declare module "express-session" {
  interface SessionData {
    user?: { id: number; username: string; email: string };
    admin?: { id: number; username: string; email: string };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "onetasksecret123",
      resave: false,
      saveUninitialized: false,
      cookie: { 
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      }
    })
  );

  // Passport setup
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport for user authentication
  passport.use(
    "local",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || user.password !== password) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Configure passport for admin authentication
  passport.use(
    "admin-local",
    new LocalStrategy(async (username, password, done) => {
      try {
        const admin = await storage.getAdminUserByUsername(username);
        if (!admin || admin.password !== password) {
          return done(null, false, { message: "Invalid admin credentials" });
        }
        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, { id: user.id, isAdmin: user.email.includes("admin") });
  });

  passport.deserializeUser(async (serialized: any, done) => {
    try {
      if (serialized.isAdmin) {
        const admin = await storage.getAdminUser(serialized.id);
        return done(null, admin);
      } else {
        const user = await storage.getUser(serialized.id);
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  });

  // Create an API router
  const apiRouter = express.Router();

  // Middleware to validate request bodies with Zod schemas
  const validateBody = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          res.status(400).json({ message: validationError.message });
        } else {
          res.status(400).json({ message: "Invalid request body" });
        }
      }
    };
  };

  // Middleware to ensure user is authenticated
  const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && !req.session.admin) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Middleware to ensure admin is authenticated
  const ensureAdminAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.session.admin) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Auth routes
  apiRouter.post("/auth/register", validateBody(insertUserSchema), async (req, res) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(req.body);
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  });

  apiRouter.post("/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        req.session.admin = undefined;
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  apiRouter.post("/auth/admin/login", (req, res, next) => {
    passport.authenticate("admin-local", (err: any, admin: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!admin) {
        return res.status(401).json({ message: info.message || "Invalid admin credentials" });
      }
      req.logIn(admin, (err) => {
        if (err) {
          return next(err);
        }
        req.session.admin = {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        };
        req.session.user = undefined;
        const { password, ...adminWithoutPassword } = admin;
        return res.status(200).json(adminWithoutPassword);
      });
    })(req, res, next);
  });

  apiRouter.post("/auth/logout", (req, res) => {
    req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging out" });
        }
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });

  // User routes
  apiRouter.get("/users/me", ensureAuthenticated, async (req, res) => {
    const user = await storage.getUser(req.session.user!.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  });

  // Admin routes
  apiRouter.get("/admin/me", ensureAdminAuthenticated, async (req, res) => {
    const admin = await storage.getAdminUser(req.session.admin!.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const { password, ...adminWithoutPassword } = admin;
    res.status(200).json(adminWithoutPassword);
  });

  // Task routes
  apiRouter.post("/tasks", validateBody(insertTaskSchema), async (req, res) => {
    try {
      const task = await storage.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error creating task" });
    }
  });

  apiRouter.get("/tasks", ensureAdminAuthenticated, async (req, res) => {
    try {
      const search = req.query.search as string | undefined;
      const status = req.query.status as string | undefined;
      
      let tasks;
      if (search) {
        tasks = await storage.searchTasks(search);
      } else if (status) {
        tasks = await storage.getTasksByStatus(status);
      } else {
        tasks = await storage.getAllTasks();
      }
      
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving tasks" });
    }
  });

  apiRouter.get("/tasks/:id", ensureAdminAuthenticated, async (req, res) => {
    try {
      const task = await storage.getTask(parseInt(req.params.id));
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving task" });
    }
  });

  apiRouter.patch("/tasks/:id/status", ensureAdminAuthenticated, async (req, res) => {
    try {
      const { status } = req.body;
      if (!Object.values(TaskStatusEnum).includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const task = await storage.updateTaskStatus(parseInt(req.params.id), status);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating task status" });
    }
  });

  apiRouter.patch("/tasks/:id", ensureAdminAuthenticated, async (req, res) => {
    try {
      const task = await storage.updateTask(parseInt(req.params.id), req.body);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating task" });
    }
  });

  apiRouter.delete("/tasks/:id", ensureAdminAuthenticated, async (req, res) => {
    try {
      const success = await storage.deleteTask(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
    }
  });

  // Testimonial routes
  apiRouter.get("/testimonials", async (req, res) => {
    try {
      // Get published testimonials for public access or all for admin
      const isAdmin = req.isAuthenticated() && req.session.admin;
      const testimonials = await storage.getAllTestimonials(!isAdmin);
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving testimonials" });
    }
  });

  apiRouter.post("/testimonials", ensureAdminAuthenticated, validateBody(insertTestimonialSchema), async (req, res) => {
    try {
      const testimonial = await storage.createTestimonial(req.body);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Error creating testimonial" });
    }
  });

  apiRouter.patch("/testimonials/:id", ensureAdminAuthenticated, async (req, res) => {
    try {
      const testimonial = await storage.updateTestimonial(parseInt(req.params.id), req.body);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Error updating testimonial" });
    }
  });

  apiRouter.delete("/testimonials/:id", ensureAdminAuthenticated, async (req, res) => {
    try {
      const success = await storage.deleteTestimonial(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting testimonial" });
    }
  });

  // Page content routes
  apiRouter.get("/content/:pageSlug", async (req, res) => {
    try {
      const content = await storage.getPageContent(req.params.pageSlug);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving content" });
    }
  });

  apiRouter.get("/content", ensureAdminAuthenticated, async (req, res) => {
    try {
      const contents = await storage.getAllPageContents();
      res.status(200).json(contents);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving contents" });
    }
  });

  apiRouter.post("/content", ensureAdminAuthenticated, validateBody(insertPageContentSchema), async (req, res) => {
    try {
      const existing = await storage.getPageContent(req.body.pageSlug);
      if (existing) {
        return res.status(400).json({ message: "Content for this page already exists" });
      }
      
      const content = await storage.createPageContent(req.body);
      res.status(201).json(content);
    } catch (error) {
      res.status(500).json({ message: "Error creating content" });
    }
  });

  apiRouter.patch("/content/:id", ensureAdminAuthenticated, async (req, res) => {
    try {
      const content = await storage.updatePageContent(parseInt(req.params.id), req.body);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: "Error updating content" });
    }
  });

  // Register API routes
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
