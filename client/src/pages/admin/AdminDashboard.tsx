import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar,
  TrendingUp,
  Users,
  CheckSquare,
} from "lucide-react";
import { TaskStatusEnum } from "@shared/schema";

export default function AdminDashboard() {
  const { isAdmin, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not authenticated as admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, isLoading, setLocation]);

  // Fetch tasks for dashboard stats
  const { data: tasks } = useQuery({
    queryKey: ["/api/tasks"],
    enabled: isAdmin,
  });

  // Fetch testimonials for dashboard stats
  const { data: testimonials } = useQuery({
    queryKey: ["/api/testimonials"],
    enabled: isAdmin,
  });

  // Calculate task statistics
  const taskStats = {
    total: tasks?.length || 0,
    pending: tasks?.filter(task => task.status === TaskStatusEnum.PENDING).length || 0,
    inProgress: tasks?.filter(task => task.status === TaskStatusEnum.IN_PROGRESS).length || 0,
    completed: tasks?.filter(task => task.status === TaskStatusEnum.COMPLETED).length || 0,
    cancelled: tasks?.filter(task => task.status === TaskStatusEnum.CANCELLED).length || 0,
  };

  // Calculate completion rate
  const completionRate = taskStats.total > 0 
    ? Math.round((taskStats.completed / taskStats.total) * 100) 
    : 0;

  // Get recent tasks
  const recentTasks = tasks?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Tasks
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{taskStats.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    Tasks awaiting processing
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Progress
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{taskStats.inProgress}</div>
                  <p className="text-xs text-muted-foreground">
                    Tasks currently being worked on
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Tasks
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{taskStats.completed}</div>
                  <p className="text-xs text-muted-foreground">
                    Successfully completed tasks
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Task completion success rate
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent Tasks</TabsTrigger>
                <TabsTrigger value="overview">System Overview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Tasks</CardTitle>
                    <CardDescription>
                      The latest tasks submitted to the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentTasks.length > 0 ? (
                      <div className="space-y-4">
                        {recentTasks.map((task) => (
                          <div 
                            key={task.id} 
                            className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{task.name}</span>
                              <span className="text-sm text-muted-foreground capitalize">
                                {task.taskType.replace(/-/g, ' ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-right">
                                {new Date(task.createdAt).toLocaleDateString()}
                              </div>
                              <div>
                                {task.status === TaskStatusEnum.PENDING && (
                                  <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                                )}
                                {task.status === TaskStatusEnum.IN_PROGRESS && (
                                  <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                                )}
                                {task.status === TaskStatusEnum.COMPLETED && (
                                  <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                )}
                                {task.status === TaskStatusEnum.CANCELLED && (
                                  <span className="flex h-2 w-2 rounded-full bg-red-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No tasks available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Tasks
                      </CardTitle>
                      <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{taskStats.total}</div>
                      <p className="text-xs text-muted-foreground">
                        All-time task submissions
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Testimonials
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{testimonials?.length || 0}</div>
                      <p className="text-xs text-muted-foreground">
                        Client testimonials received
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Cancelled Tasks
                      </CardTitle>
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{taskStats.cancelled}</div>
                      <p className="text-xs text-muted-foreground">
                        Cancelled or rejected tasks
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>
                      Current status of the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-2 w-2 rounded-full bg-green-500" />
                          <span>Task Submission System</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-2 w-2 rounded-full bg-green-500" />
                          <span>User Authentication</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-2 w-2 rounded-full bg-green-500" />
                          <span>Content Management</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-2 w-2 rounded-full bg-green-500" />
                          <span>File Storage</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">Operational</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
