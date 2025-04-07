import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";

const pricingPlans = [
  {
    name: "Basic",
    description: "For individuals with occasional tasks",
    price: 19,
    popular: false,
    features: [
      "Simple tasks",
      "48-hour delivery",
      "1 revision",
      "Email support"
    ]
  },
  {
    name: "Pro",
    description: "For professionals with regular tasks",
    price: 49,
    popular: true,
    features: [
      "Complex tasks",
      "24-hour delivery",
      "3 revisions",
      "Priority support",
      "Detailed reporting"
    ]
  },
  {
    name: "Business",
    description: "For teams and businesses",
    price: 99,
    popular: false,
    features: [
      "Advanced tasks",
      "12-hour delivery",
      "Unlimited revisions",
      "Dedicated manager",
      "API integration",
      "Custom workflows"
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Choose the plan that works best for your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? "border-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-600">/task</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#task-submission">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Choose {plan.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
