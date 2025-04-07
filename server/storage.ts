import { 
  users, type User, type InsertUser,
  adminUsers, type AdminUser, type InsertAdminUser,
  tasks, type Task, type InsertTask,
  testimonials, type Testimonial, type InsertTestimonial,
  pageContents, type PageContent, type InsertPageContent,
  TaskStatusEnum
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;

  // Admin operations
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  getAllAdminUsers(): Promise<AdminUser[]>;

  // Task operations
  getTask(id: number): Promise<Task | undefined>;
  getTasksByUser(userId: number): Promise<Task[]>;
  getTasksByStatus(status: string): Promise<Task[]>;
  getTasksByAssignee(adminId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTaskStatus(id: number, status: string): Promise<Task | undefined>;
  updateTask(id: number, task: Partial<Task>): Promise<Task | undefined>;
  getAllTasks(): Promise<Task[]>;
  deleteTask(id: number): Promise<boolean>;
  searchTasks(query: string): Promise<Task[]>;

  // Testimonial operations
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getAllTestimonials(publishedOnly?: boolean): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<Testimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;

  // Page content operations
  getPageContent(pageSlug: string): Promise<PageContent | undefined>;
  getAllPageContents(): Promise<PageContent[]>;
  createPageContent(content: InsertPageContent): Promise<PageContent>;
  updatePageContent(id: number, content: Partial<PageContent>): Promise<PageContent | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private adminUsers: Map<number, AdminUser>;
  private tasks: Map<number, Task>;
  private testimonials: Map<number, Testimonial>;
  private pageContents: Map<number, PageContent>;
  
  private userCurrentId: number;
  private adminCurrentId: number;
  private taskCurrentId: number;
  private testimonialCurrentId: number;
  private pageContentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.adminUsers = new Map();
    this.tasks = new Map();
    this.testimonials = new Map();
    this.pageContents = new Map();
    
    this.userCurrentId = 1;
    this.adminCurrentId = 1;
    this.taskCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.pageContentCurrentId = 1;

    // Initialize with default admin user
    this.createAdminUser({
      username: "admin",
      password: "admin123", // In real app, this would be hashed
      email: "admin@onesteptask.com",
      name: "Admin User"
    });

    // Initialize with default testimonials
    this.createTestimonial({
      name: "Jessica Davis",
      position: "Marketing Manager",
      rating: 5,
      content: "OneStepTask made handling my project so simple. I submitted my request and received high-quality work in record time. Definitely using them again!",
      isPublished: true
    });

    this.createTestimonial({
      name: "Michael Johnson",
      position: "Business Analyst",
      rating: 5,
      content: "The team at OneStepTask exceeded my expectations. They completed my research project efficiently and the quality was excellent. Highly recommended!",
      isPublished: true
    });

    this.createTestimonial({
      name: "Sarah Robinson",
      position: "Startup Founder",
      rating: 4,
      content: "As a busy entrepreneur, I don't have time for every task. OneStepTask has been a lifesaver for me. Their work is reliable and the process couldn't be easier.",
      isPublished: true
    });

    // Initialize with default page content
    this.createPageContent({
      pageSlug: "home",
      content: {
        hero: {
          title: "One Step to Simplify Your Tasks",
          subtitle: "Submit your tasks and let us handle them for you. Fast, reliable, and hassle-free."
        },
        features: [
          {
            icon: "check-circle",
            title: "Simplified Process",
            description: "Submit your task in one step and we'll take care of the rest."
          },
          {
            icon: "bolt",
            title: "Fast Turnaround",
            description: "Get your tasks completed quickly with our efficient process."
          },
          {
            icon: "shield-alt",
            title: "Secure & Reliable",
            description: "Your data is protected and your tasks are handled professionally."
          }
        ],
        howItWorks: [
          {
            step: 1,
            title: "Submit Your Task",
            description: "Fill out our simple form with your task details and requirements."
          },
          {
            step: 2,
            title: "We Process It",
            description: "Our team reviews your request and begins working on your task."
          },
          {
            step: 3,
            title: "Receive Results",
            description: "Get your completed task delivered to you on time and to specification."
          }
        ],
        faq: [
          {
            question: "What types of tasks can I submit?",
            answer: "We handle a wide range of tasks including research, data entry, content writing, design work, and more. If you're unsure if we can handle your specific task, please contact us and we'll be happy to discuss it."
          },
          {
            question: "How quickly will my task be completed?",
            answer: "Task completion time depends on complexity and your chosen plan. Basic tasks are typically completed within 48 hours, Pro tasks within 24 hours, and Business tasks within 12 hours. For urgent requests, please contact us directly."
          },
          {
            question: "What if I'm not satisfied with the results?",
            answer: "We offer revisions based on your plan - 1 revision for Basic, 3 for Pro, and unlimited for Business. If you're still not satisfied after revisions, we have a satisfaction guarantee and will work with you to make it right."
          },
          {
            question: "Is my data secure?",
            answer: "Yes, we take data security seriously. All information is encrypted, and we have strict confidentiality policies. We never share your data with third parties without your consent."
          },
          {
            question: "Do you offer bulk pricing for multiple tasks?",
            answer: "Yes, we offer discounted rates for bulk task submissions. Contact our sales team for custom quotes based on your specific needs and volume."
          }
        ]
      }
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const timestamp = new Date();
    const user: User = { ...insertUser, id, createdAt: timestamp };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  // Admin operations
  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (admin) => admin.username === username,
    );
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (admin) => admin.email === email,
    );
  }

  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const id = this.adminCurrentId++;
    const timestamp = new Date();
    const admin: AdminUser = { ...insertAdmin, id, createdAt: timestamp };
    this.adminUsers.set(id, admin);
    return admin;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }

  // Task operations
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId,
    );
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.status === status,
    );
  }

  async getTasksByAssignee(adminId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.assignedTo === adminId,
    );
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskCurrentId++;
    const timestamp = new Date();
    const task: Task = { 
      ...insertTask, 
      id, 
      status: TaskStatusEnum.PENDING, 
      createdAt: timestamp, 
      updatedAt: timestamp,
      userId: undefined,
      assignedTo: undefined,
      comments: ""
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTaskStatus(id: number, status: string): Promise<Task | undefined> {
    const task = await this.getTask(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, status, updatedAt: new Date() };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | undefined> {
    const task = await this.getTask(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...taskData, updatedAt: new Date() };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async getAllTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async searchTasks(query: string): Promise<Task[]> {
    const lowerCaseQuery = query.toLowerCase();
    return Array.from(this.tasks.values()).filter(
      (task) => {
        return (
          task.name.toLowerCase().includes(lowerCaseQuery) ||
          task.email.toLowerCase().includes(lowerCaseQuery) ||
          task.description.toLowerCase().includes(lowerCaseQuery) ||
          task.taskType.toLowerCase().includes(lowerCaseQuery)
        );
      }
    );
  }

  // Testimonial operations
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async getAllTestimonials(publishedOnly: boolean = false): Promise<Testimonial[]> {
    const allTestimonials = Array.from(this.testimonials.values());
    return publishedOnly 
      ? allTestimonials.filter(t => t.isPublished) 
      : allTestimonials;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const timestamp = new Date();
    const testimonial: Testimonial = { ...insertTestimonial, id, createdAt: timestamp };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: number, testimonialData: Partial<Testimonial>): Promise<Testimonial | undefined> {
    const testimonial = await this.getTestimonial(id);
    if (!testimonial) return undefined;
    
    const updatedTestimonial = { ...testimonial, ...testimonialData };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Page content operations
  async getPageContent(pageSlug: string): Promise<PageContent | undefined> {
    return Array.from(this.pageContents.values()).find(
      (content) => content.pageSlug === pageSlug,
    );
  }

  async getAllPageContents(): Promise<PageContent[]> {
    return Array.from(this.pageContents.values());
  }

  async createPageContent(insertContent: InsertPageContent): Promise<PageContent> {
    const id = this.pageContentCurrentId++;
    const timestamp = new Date();
    const content: PageContent = { ...insertContent, id, lastUpdated: timestamp };
    this.pageContents.set(id, content);
    return content;
  }

  async updatePageContent(id: number, contentData: Partial<PageContent>): Promise<PageContent | undefined> {
    const content = await this.getPageContent(id.toString());
    if (!content) return undefined;
    
    const updatedContent = { 
      ...content, 
      ...contentData, 
      lastUpdated: new Date() 
    };
    this.pageContents.set(id, updatedContent);
    return updatedContent;
  }
}

export const storage = new MemStorage();
