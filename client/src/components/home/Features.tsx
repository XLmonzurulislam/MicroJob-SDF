import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  Zap, 
  Shield 
} from "lucide-react";

export default function Features() {
  const { data: content } = useQuery({
    queryKey: ["/api/content/home"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const featuresContent = content?.content?.features || [
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
  ];

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "check-circle":
        return <CheckCircle className="text-primary text-2xl" />;
      case "bolt":
        return <Zap className="text-primary text-2xl" />;
      case "shield-alt":
        return <Shield className="text-primary text-2xl" />;
      default:
        return <CheckCircle className="text-primary text-2xl" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose OneStepTask?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our platform makes task management simple, efficient, and stress-free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresContent.map((feature, index) => (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
