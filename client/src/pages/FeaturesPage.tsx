import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Clock, Shield, Users, FileText, Lightbulb, BarChart3, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-secondary-900 py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h1>
            <p className="text-lg md:text-xl text-slate-100 mb-0">
              Discover all the ways OneStepTask can help streamline your workflow
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform is designed to make task management simple, efficient, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-slate-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Simplified Process</h3>
                <p className="text-slate-600">Submit your task in one step and we'll take care of the rest. No complicated forms or lengthy processes.</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                  <Clock className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Turnaround</h3>
                <p className="text-slate-600">Get your tasks completed quickly with our efficient process. We understand that time is valuable to you.</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
                <p className="text-slate-600">Your data is protected and your tasks are handled professionally with strict confidentiality guaranteed.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <div className="p-1 bg-gradient-to-r from-primary to-secondary-800 rounded-lg max-w-md">
                  <div className="bg-white p-8 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <div>
                          <h4 className="font-medium text-slate-900">Research & Analysis</h4>
                          <p className="text-sm text-slate-600">Thorough market research and data analysis</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <div>
                          <h4 className="font-medium text-slate-900">Content Creation</h4>
                          <p className="text-sm text-slate-600">Professional content writing for any purpose</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <div>
                          <h4 className="font-medium text-slate-900">Data Entry</h4>
                          <p className="text-sm text-slate-600">Accurate and efficient data processing</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2" />
                        <div>
                          <h4 className="font-medium text-slate-900">Design Services</h4>
                          <p className="text-sm text-slate-600">Creative design solutions for your needs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Task Diversity</h2>
                <p className="text-slate-600 mb-6">
                  We handle a wide range of tasks across various domains. Our team of experts can assist with everything from research and content creation to data entry and design work.
                </p>
                <p className="text-slate-600 mb-6">
                  Whether you need help with a one-time project or ongoing support, we have the expertise and resources to deliver high-quality results that meet your specific requirements.
                </p>
                <Link href="/#task-submission">
                  <Button>Submit a Task</Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">User-Friendly Dashboard</h2>
                <p className="text-slate-600 mb-6">
                  Track all your tasks in one place with our intuitive dashboard. Monitor progress, provide feedback, and access completed work with ease.
                </p>
                <p className="text-slate-600 mb-6">
                  Our platform is designed to make collaboration seamless, allowing you to communicate directly with our team throughout the process.
                </p>
                <Link href="/#login-section">
                  <Button>Get Started</Button>
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="p-1 bg-gradient-to-r from-primary to-secondary-800 rounded-lg max-w-md ml-auto">
                  <div className="bg-white p-8 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                        <BarChart3 className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium text-slate-900">Task Progress</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                        <Clock className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium text-slate-900">Delivery Tracking</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                        <FileText className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium text-slate-900">Document Access</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                        <Users className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium text-slate-900">Team Chat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose OneStepTask?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine technology and expertise to deliver superior results for all your task needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-slate-600">Skilled professionals with experience across multiple domains</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Efficient Process</h3>
              <p className="text-slate-600">Streamlined workflows that save you time and effort</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-slate-600">Satisfaction guaranteed or we'll revise until you're happy</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
              <p className="text-slate-600">Responsive customer service to address your concerns</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to simplify your workflow?</h2>
          <p className="text-lg text-slate-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have streamlined their work with OneStepTask.
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
            <Link href="/pricing">
              <Button
                variant="outline"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-md font-semibold transition-colors border-white text-white h-auto"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
