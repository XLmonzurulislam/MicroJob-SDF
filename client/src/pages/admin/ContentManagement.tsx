import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import ContentEditor from "@/components/admin/ContentEditor";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Pencil, RefreshCw } from "lucide-react";

export default function ContentManagement() {
  const { isAdmin, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const queryClient = useQueryClient();

  // Redirect if not authenticated as admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, isLoading, setLocation]);

  // Fetch all page contents
  const { 
    data: contents,
    isLoading: isLoadingContents,
    isError: isErrorContents,
    refetch: refetchContents
  } = useQuery({
    queryKey: ["/api/content"],
    enabled: isAdmin,
  });

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy, h:mm a");
    } catch (error) {
      return dateString;
    }
  };

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
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => refetchContents()}
                disabled={isLoadingContents}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>
                  Edit website content and sections for different pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingContents ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : isErrorContents ? (
                  <div className="text-center py-8 text-red-500">
                    <p>Error loading content. Please try again.</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => refetchContents()}
                    >
                      Retry
                    </Button>
                  </div>
                ) : contents?.length ? (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Page</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contents.map((content: any) => (
                          <TableRow key={content.id}>
                            <TableCell className="font-medium capitalize">
                              {content.pageSlug.replace(/-/g, ' ')}
                            </TableCell>
                            <TableCell>{formatDate(content.lastUpdated)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContent(content)}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No content found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {selectedContent && (
        <ContentEditor
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ["/api/content"] });
            setSelectedContent(null);
          }}
        />
      )}
    </div>
  );
}
