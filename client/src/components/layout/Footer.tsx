import { Link, useLocation } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp } from "lucide-react";
import { useState } from "react";
import AdminLoginModal from "@/components/auth/AdminLoginModal";

export default function Footer() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [currentPath] = useLocation();
  
  // Check if the current path is an admin path
  const isAdminPath = currentPath.startsWith("/admin");

  // Don't show footer on admin pages
  if (isAdminPath) {
    return null;
  }
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">OneStepTask</h3>
            <p className="mb-4">Simplifying your tasks, one step at a time.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-white">Research Tasks</Link></li>
              <li><Link href="/features" className="hover:text-white">Data Entry</Link></li>
              <li><Link href="/features" className="hover:text-white">Content Writing</Link></li>
              <li><Link href="/features" className="hover:text-white">Design Services</Link></li>
              <li><Link href="/features" className="hover:text-white">Custom Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">GDPR Compliance</a></li>
              <li>
                <button 
                  onClick={() => setIsAdminModalOpen(true)} 
                  className="hover:text-white"
                >
                  Admin
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} OneStepTask. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </footer>
  );
}
