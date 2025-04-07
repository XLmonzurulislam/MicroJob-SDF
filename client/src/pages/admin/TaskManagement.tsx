import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import TasksList from "@/components/admin/TasksList";

export default function TaskManagement() {
  const { isAdmin, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not authenticated as admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, isLoading, setLocation]);

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
            <h1 className="text-2xl font-bold tracking-tight mb-4">Task Management</h1>
            
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  );
}
