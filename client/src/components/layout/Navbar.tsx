import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLoginModal from "@/components/auth/AdminLoginModal";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPath] = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Check if the current path is an admin path
  const isAdminPath = currentPath.startsWith("/admin");

  // Don't show navbar on admin pages except login
  if (isAdminPath && currentPath !== "/admin/login") {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-primary text-2xl font-bold">OneStepTask</span>
            </Link>
            <nav className="ml-10 hidden space-x-6 md:flex">
              <Link href="/" className={`font-medium ${currentPath === "/" ? "text-primary" : "text-slate-600 hover:text-primary"}`}>
                Home
              </Link>
              <Link href="/features" className={`font-medium ${currentPath === "/features" ? "text-primary" : "text-slate-600 hover:text-primary"}`}>
                Features
              </Link>
              <Link href="/pricing" className={`font-medium ${currentPath === "/pricing" ? "text-primary" : "text-slate-600 hover:text-primary"}`}>
                Pricing
              </Link>
              <Link href="/about" className={`font-medium ${currentPath === "/about" ? "text-primary" : "text-slate-600 hover:text-primary"}`}>
                About
              </Link>
              <Link href="/contact" className={`font-medium ${currentPath === "/contact" ? "text-primary" : "text-slate-600 hover:text-primary"}`}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link href="/admin">
                    <Button variant="outline">Admin Dashboard</Button>
                  </Link>
                ) : (
                  <Button variant="outline" onClick={() => logout()}>Log out</Button>
                )}
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="hidden sm:inline-flex"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Log in
                </Button>
                <Button onClick={() => setIsLoginModalOpen(true)}>
                  Get Started
                </Button>
              </>
            )}
            <button 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="text-slate-600 h-6 w-6" />
              ) : (
                <Menu className="text-slate-600 h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link href="/" className="block py-2 text-slate-600 hover:bg-slate-50 rounded-md px-3">
                Home
              </Link>
              <Link href="/features" className="block py-2 text-slate-600 hover:bg-slate-50 rounded-md px-3">
                Features
              </Link>
              <Link href="/pricing" className="block py-2 text-slate-600 hover:bg-slate-50 rounded-md px-3">
                Pricing
              </Link>
              <Link href="/about" className="block py-2 text-slate-600 hover:bg-slate-50 rounded-md px-3">
                About
              </Link>
              <Link href="/contact" className="block py-2 text-slate-600 hover:bg-slate-50 rounded-md px-3">
                Contact
              </Link>
              {!isAuthenticated && (
                <Button
                  variant="default"
                  className="w-full mt-3"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Log in / Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
