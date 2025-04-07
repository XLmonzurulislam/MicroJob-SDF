import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import UsersList from "@/components/admin/UsersList";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserManagement() {
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
            <h1 className="text-2xl font-bold tracking-tight mb-4">User Management</h1>
            
            <Tabs defaultValue="users">
              <TabsList>
                <TabsTrigger value="users">Customers</TabsTrigger>
                <TabsTrigger value="admins">Administrators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="space-y-4">
                <UsersList />
              </TabsContent>
              
              <TabsContent value="admins" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Users</CardTitle>
                    <CardDescription>
                      Manage administrator accounts that have access to the admin panel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="py-3 px-4 text-left font-medium text-slate-700">Name</th>
                            <th className="py-3 px-4 text-left font-medium text-slate-700">Username</th>
                            <th className="py-3 px-4 text-left font-medium text-slate-700">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200">
                            <td className="py-3 px-4 text-slate-900">Admin User</td>
                            <td className="py-3 px-4 text-slate-900">admin</td>
                            <td className="py-3 px-4 text-slate-900">admin@onesteptask.com</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      New admin users can only be created by database administrators for security purposes.
                    </p>
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
