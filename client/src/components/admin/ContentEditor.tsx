import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash } from "lucide-react";

interface ContentEditorProps {
  content: any;
  onClose: () => void;
  onSave: () => void;
}

export default function ContentEditor({ content, onClose, onSave }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState(content.content);
  const { toast } = useToast();

  // Update content mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/content/${content.id}`, {
        content: editedContent,
      });
    },
    onSuccess: () => {
      toast({
        title: "Content updated",
        description: "The content has been successfully updated.",
      });
      onSave();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Helper function to update nested state
  const updateContent = (section: string, key: string, value: any) => {
    setEditedContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Helper function to update array items
  const updateArrayItem = (section: string, index: number, key: string, value: any) => {
    setEditedContent((prev: any) => {
      const newArray = [...prev[section]];
      newArray[index] = {
        ...newArray[index],
        [key]: value,
      };
      return {
        ...prev,
        [section]: newArray,
      };
    });
  };

  // Add new item to array
  const addArrayItem = (section: string, template: any) => {
    setEditedContent((prev: any) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  // Remove item from array
  const removeArrayItem = (section: string, index: number) => {
    setEditedContent((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index),
    }));
  };

  const renderHomePageEditor = () => {
    return (
      <>
        {/* Hero Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Hero Section</h3>
          <div className="grid gap-4">
            <div>
              <Label>Title</Label>
              <Input 
                value={editedContent.hero?.title || ""} 
                onChange={(e) => updateContent("hero", "title", e.target.value)} 
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea 
                value={editedContent.hero?.subtitle || ""} 
                onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Features Section */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Features</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => 
                addArrayItem("features", {
                  icon: "check-circle",
                  title: "New Feature",
                  description: "Description of the new feature"
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </Button>
          </div>
          
          <div className="space-y-6">
            {editedContent.features?.map((feature: any, index: number) => (
              <div key={index} className="border p-4 rounded-md relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 text-destructive"
                  onClick={() => removeArrayItem("features", index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                
                <div className="grid gap-4">
                  <div>
                    <Label>Icon</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                      value={feature.icon} 
                      onChange={(e) => updateArrayItem("features", index, "icon", e.target.value)}
                    >
                      <option value="check-circle">Check Circle</option>
                      <option value="bolt">Bolt</option>
                      <option value="shield-alt">Shield</option>
                      <option value="chart-bar">Chart</option>
                      <option value="clock">Clock</option>
                    </select>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input 
                      value={feature.title} 
                      onChange={(e) => updateArrayItem("features", index, "title", e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={feature.description} 
                      onChange={(e) => updateArrayItem("features", index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* How It Works Section */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">How It Works</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => 
                addArrayItem("howItWorks", {
                  step: (editedContent.howItWorks?.length || 0) + 1,
                  title: "New Step",
                  description: "Description of the new step"
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Step
            </Button>
          </div>
          
          <div className="space-y-6">
            {editedContent.howItWorks?.map((step: any, index: number) => (
              <div key={index} className="border p-4 rounded-md relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 text-destructive"
                  onClick={() => removeArrayItem("howItWorks", index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                
                <div className="grid gap-4">
                  <div>
                    <Label>Step Number</Label>
                    <Input 
                      type="number" 
                      value={step.step} 
                      onChange={(e) => updateArrayItem("howItWorks", index, "step", parseInt(e.target.value))} 
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input 
                      value={step.title} 
                      onChange={(e) => updateArrayItem("howItWorks", index, "title", e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={step.description} 
                      onChange={(e) => updateArrayItem("howItWorks", index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* FAQ Section */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">FAQ</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => 
                addArrayItem("faq", {
                  question: "New Question",
                  answer: "Answer to the new question"
                })
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Add FAQ
            </Button>
          </div>
          
          <div className="space-y-6">
            {editedContent.faq?.map((faq: any, index: number) => (
              <div key={index} className="border p-4 rounded-md relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 text-destructive"
                  onClick={() => removeArrayItem("faq", index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                
                <div className="grid gap-4">
                  <div>
                    <Label>Question</Label>
                    <Input 
                      value={faq.question} 
                      onChange={(e) => updateArrayItem("faq", index, "question", e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea 
                      value={faq.answer} 
                      onChange={(e) => updateArrayItem("faq", index, "answer", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderRawEditor = () => {
    return (
      <div>
        <Label>Raw JSON Content</Label>
        <Textarea 
          value={JSON.stringify(editedContent, null, 2)} 
          onChange={(e) => {
            try {
              const newContent = JSON.parse(e.target.value);
              setEditedContent(newContent);
            } catch (error) {
              // If invalid JSON, don't update
            }
          }}
          rows={20}
          className="font-mono text-sm"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Edit the raw JSON content (use with caution).
        </p>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Content: {content.pageSlug}</DialogTitle>
          <DialogDescription>
            Customize the content for the {content.pageSlug} page.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="visual">
          <TabsList className="mb-4">
            <TabsTrigger value="visual">Visual Editor</TabsTrigger>
            <TabsTrigger value="raw">Raw JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual">
            {content.pageSlug === 'home' ? renderHomePageEditor() : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  Visual editor for "{content.pageSlug}" is not available. Please use the Raw JSON editor.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="raw">
            {renderRawEditor()}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => mutate()} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
