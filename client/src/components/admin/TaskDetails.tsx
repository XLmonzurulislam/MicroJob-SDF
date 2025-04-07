import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { TaskStatusEnum } from "@shared/schema";
import { format } from "date-fns";
import { Pencil, Save, X } from "lucide-react";

interface TaskDetailsProps {
  task: any;
  onClose: () => void;
  onStatusChange: () => void;
}

export default function TaskDetails({ task, onClose, onStatusChange }: TaskDetailsProps) {
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState(task.comments || "");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Update task status
  const { mutate: updateTaskStatus, isPending: isStatusUpdating } = useMutation({
    mutationFn: async (newStatus: string) => {
      return apiRequest("PATCH", `/api/tasks/${task.id}/status`, { status: newStatus });
    },
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: `Task status updated to ${status}.`,
      });
      onStatusChange();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update task comments
  const { mutate: updateTaskComments, isPending: isCommentsUpdating } = useMutation({
    mutationFn: async (newComments: string) => {
      return apiRequest("PATCH", `/api/tasks/${task.id}`, { comments: newComments });
    },
    onSuccess: () => {
      toast({
        title: "Comments updated",
        description: "Task comments have been saved.",
      });
      setIsEditing(false);
      onStatusChange();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update comments. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPpp"); // Format with date and time
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            View and manage task information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Name</Label>
              <p className="font-medium">{task.name}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <p className="font-medium">{task.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Task Type</Label>
              <p className="font-medium capitalize">{task.taskType.replace(/-/g, ' ')}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Created At</Label>
              <p className="font-medium">{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Deadline</Label>
              <p className="font-medium">{formatDate(task.deadline)}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground">Description</Label>
            <p className="max-h-40 overflow-y-auto mt-1 p-2 bg-slate-50 rounded-md text-sm">
              {task.description}
            </p>
          </div>
          
          {task.attachments && (
            <div>
              <Label className="text-xs text-muted-foreground">Attachments</Label>
              <p className="font-medium">{task.attachments}</p>
            </div>
          )}
          
          <Separator />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskStatusEnum.PENDING}>Pending</SelectItem>
                  <SelectItem value={TaskStatusEnum.IN_PROGRESS}>In Progress</SelectItem>
                  <SelectItem value={TaskStatusEnum.COMPLETED}>Completed</SelectItem>
                  <SelectItem value={TaskStatusEnum.CANCELLED}>Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {status !== task.status && (
                <Button 
                  className="mt-2 w-full" 
                  size="sm" 
                  onClick={() => updateTaskStatus(status)}
                  disabled={isStatusUpdating}
                >
                  {isStatusUpdating ? "Updating..." : "Update Status"}
                </Button>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label className="text-xs text-muted-foreground">Admin Comments</Label>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                </Button>
              </div>
              {isEditing ? (
                <>
                  <Textarea 
                    value={comments} 
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                    placeholder="Add comments about this task..."
                  />
                  <Button 
                    className="mt-2 w-full" 
                    size="sm" 
                    onClick={() => updateTaskComments(comments)}
                    disabled={isCommentsUpdating}
                  >
                    {isCommentsUpdating ? "Saving..." : "Save Comments"}
                  </Button>
                </>
              ) : (
                <p className="min-h-[80px] p-2 bg-slate-50 rounded-md text-sm">
                  {comments || "No comments yet."}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
