import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Hero() {
  const { data: content } = useQuery({
    queryKey: ["/api/content/home"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const heroContent = content?.content?.hero || {
    title: "One Step to Simplify Your Tasks",
    subtitle: "Submit your tasks and let us handle them for you. Fast, reliable, and hassle-free."
  };

  return (
    <section className="w-full bg-gradient-to-r from-primary-900 to-secondary-900 py-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          {heroContent.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 text-slate-100">
          {heroContent.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/#task-submission">
            <Button
              className="px-8 py-3 bg-accent hover:bg-accent-600 rounded-md font-semibold text-slate-900 transition-colors h-auto"
              style={{ backgroundColor: "hsl(35, 92%, 51%)" }}
            >
              Submit a Task
            </Button>
          </Link>
          <Link href="/#how-it-works">
            <Button
              variant="outline"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-md font-semibold transition-colors border-white text-white h-auto"
            >
              How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
