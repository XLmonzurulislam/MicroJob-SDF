import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to simplify your tasks?</h2>
        <p className="text-lg text-slate-100 mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have streamlined their workflow with OneStepTask.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/#task-submission">
            <Button
              className="px-8 py-3 bg-accent hover:bg-accent-600 rounded-md font-semibold text-slate-900 transition-colors h-auto"
              style={{ backgroundColor: "hsl(35, 92%, 51%)" }}
            >
              Submit Your First Task
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-md font-semibold transition-colors border-white text-white h-auto"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
