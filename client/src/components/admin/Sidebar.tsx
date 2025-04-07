import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/admin/tasks",
    icon: CheckSquare,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const [currentPath] = useLocation();
  const { logout, admin } = useAuth();
  const [open, setOpen] = useState(false);

  const NavItem = ({ href, icon: Icon, title }: { href: string; icon: any; title: string }) => {
    const isActive = currentPath === href;
    
    return (
      <Link href={href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            isActive && "bg-secondary text-secondary-foreground"
          )}
          onClick={() => setOpen(false)}
        >
          <Icon className="h-5 w-5" />
          {title}
        </Button>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-2 py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold tracking-tight">OneStepTask Admin</h2>
        <p className="text-sm text-muted-foreground">Welcome, {admin?.name || "Admin"}</p>
      </div>
      <div className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      </div>
      <div className="px-4 py-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => logout()}
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b bg-background px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <div className="ml-4 flex-1">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 border-r bg-background">
        <SidebarContent />
      </div>
    </>
  );
}
