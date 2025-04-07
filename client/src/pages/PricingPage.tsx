import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "wouter";
import FAQ from "@/components/home/FAQ";

const pricingFeatures = {
  basic: [
    "Simple tasks",
    "48-hour delivery",
    "1 revision",
    "Email support"
  ],
  pro: [
    "Complex tasks",
    "24-hour delivery",
    "3 revisions",
    "Priority support",
    "Detailed reporting"
  ],
  business: [
    "Advanced tasks",
    "12-hour delivery",
    "Unlimited revisions",
    "Dedicated manager",
    "API integration",
    "Custom workflows"
  ]
};

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-secondary-900 py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl text-slate-100 mb-0">
              Choose the plan that works best for your needs, with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Basic</h3>
                <p className="text-slate-600 mb-6">For individuals with occasional tasks</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$19</span>
                  <span className="text-slate-600">/task</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pricingFeatures.basic.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#task-submission">
                  <Button 
                    className="w-full" 
                    variant="outline"
                  >
                    Choose Basic
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-primary">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
                <p className="text-slate-600 mb-6">For professionals with regular tasks</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$49</span>
                  <span className="text-slate-600">/task</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pricingFeatures.pro.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#task-submission">
                  <Button className="w-full">
                    Choose Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Business Plan */}
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Business</h3>
                <p className="text-slate-600 mb-6">For teams and businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-600">/task</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pricingFeatures.business.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#task-submission">
                  <Button 
                    className="w-full" 
                    variant="outline"
                  >
                    Choose Business
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Volume Discounts */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Volume Discounts</h2>
            <p className="text-lg text-slate-600">
              Save more when you submit multiple tasks. Contact us for custom pricing tailored to your needs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">5-10 Tasks</h3>
                      <p className="text-sm text-slate-600">Monthly submission</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">10% Off</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">11-25 Tasks</h3>
                      <p className="text-sm text-slate-600">Monthly submission</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">15% Off</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">26-50 Tasks</h3>
                      <p className="text-sm text-slate-600">Monthly submission</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">20% Off</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-900">50+ Tasks</h3>
                      <p className="text-sm text-slate-600">Monthly submission</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">Custom Pricing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link href="/contact">
                <Button>Contact Sales for Custom Pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Enterprise Solutions</h2>
                <p className="text-slate-600 mb-6">
                  For organizations with high-volume or specialized needs, we offer custom enterprise solutions that are tailored to your specific requirements.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-slate-600">Dedicated account management team</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-slate-600">Custom SLAs with guaranteed response times</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-slate-600">API integration with your existing systems</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-slate-600">Custom reporting and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-slate-600">Volume-based pricing with significant discounts</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="secondary">Schedule a Consultation</Button>
                </Link>
              </div>
              <div className="bg-slate-50 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">1</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900">Consultation</h3>
                      <p className="text-sm text-slate-600">We'll discuss your needs and challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">2</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900">Custom Proposal</h3>
                      <p className="text-sm text-slate-600">Receive a tailored solution and pricing</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">3</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900">Implementation</h3>
                      <p className="text-sm text-slate-600">Seamless integration with your workflow</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">4</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-900">Ongoing Support</h3>
                      <p className="text-sm text-slate-600">Continuous assistance and optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-slate-100 mb-10 max-w-2xl mx-auto">
            Choose the plan that works best for you and start simplifying your tasks today.
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
    </div>
  );
}
