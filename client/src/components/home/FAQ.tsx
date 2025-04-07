import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function FAQ() {
  const { data: content } = useQuery({
    queryKey: ["/api/content/home"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const faqContent = content?.content?.faq || [
    {
      question: "What types of tasks can I submit?",
      answer: "We handle a wide range of tasks including research, data entry, content writing, design work, and more. If you're unsure if we can handle your specific task, please contact us and we'll be happy to discuss it."
    },
    {
      question: "How quickly will my task be completed?",
      answer: "Task completion time depends on complexity and your chosen plan. Basic tasks are typically completed within 48 hours, Pro tasks within 24 hours, and Business tasks within 12 hours. For urgent requests, please contact us directly."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer revisions based on your plan - 1 revision for Basic, 3 for Pro, and unlimited for Business. If you're still not satisfied after revisions, we have a satisfaction guarantee and will work with you to make it right."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All information is encrypted, and we have strict confidentiality policies. We never share your data with third parties without your consent."
    },
    {
      question: "Do you offer bulk pricing for multiple tasks?",
      answer: "Yes, we offer discounted rates for bulk task submissions. Contact our sales team for custom quotes based on your specific needs and volume."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Find answers to common questions about our services.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqContent.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-primary px-6 py-4 bg-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-white text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
