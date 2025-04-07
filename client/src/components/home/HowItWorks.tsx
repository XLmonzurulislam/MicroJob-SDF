import { useQuery } from "@tanstack/react-query";

export default function HowItWorks() {
  const { data: content } = useQuery({
    queryKey: ["/api/content/home"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const howItWorksContent = content?.content?.howItWorks || [
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
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Complete your tasks in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksContent.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 relative z-10">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
              
              {/* Connector line (hidden on mobile) */}
              {index < howItWorksContent.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-primary -z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
