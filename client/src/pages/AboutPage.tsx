import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-secondary-900 py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About OneStepTask</h1>
            <p className="text-lg md:text-xl text-slate-100 mb-0">
              Our mission is to simplify your tasks and help you focus on what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Our Story</h2>
            <div className="space-y-6 text-slate-600">
              <p>
                OneStepTask was founded in 2020 with a simple idea: make task management effortless for everyone. We noticed that people were spending too much time on repetitive, time-consuming tasks when they could be focusing on more important things.
              </p>
              <p>
                Our team of experienced professionals comes from diverse backgrounds in project management, customer service, and technology. This diversity allows us to understand and handle a wide range of tasks effectively.
              </p>
              <p>
                What started as a small service helping local businesses has now grown into a trusted platform serving clients worldwide. Our commitment to quality, reliability, and customer satisfaction remains at the core of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 12 2 2 4-4" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Excellence</h3>
              <p className="text-slate-600">We strive for excellence in every task we handle, no matter how big or small.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Reliability</h3>
              <p className="text-slate-600">We deliver on our promises, ensuring consistent and dependable service.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Customer Focus</h3>
              <p className="text-slate-600">Our clients' needs and satisfaction are at the center of everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Sarah Johnson</h3>
              <p className="text-primary">Founder & CEO</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Michael Chen</h3>
              <p className="text-primary">Operations Director</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Emily Rodriguez</h3>
              <p className="text-primary">Customer Success</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">David Kim</h3>
              <p className="text-primary">Technology Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-slate-100 mb-8 max-w-2xl mx-auto">
            Join the thousands of satisfied customers who trust OneStepTask with their important work.
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
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
