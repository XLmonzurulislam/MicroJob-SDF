import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import TaskSubmissionForm from "@/components/home/TaskSubmissionForm";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import LoginForm from "@/components/auth/LoginForm";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <TaskSubmissionForm />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <LoginForm />
    </div>
  );
}
