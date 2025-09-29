import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  UserCheck, 
  CreditCard, 
  BarChart3, 
  Menu,
  X,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Staff', href: '/staff', icon: UserCheck },
  { name: 'Payments', href: '/payments', icon: CreditCard },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-foreground/25" />
          <div className="fixed inset-y-0 left-0 w-64 bg-card card-shadow">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card card-shadow px-4 py-6">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              PulseBook Clinic Management
            </h1>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Dr. Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );

  function SidebarContent() {
    return (
      <>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">PulseBook</h2>
            <p className="text-xs text-muted-foreground">Clinic Manager</p>
          </div>
          <Button
            variant="ghost" 
            size="sm" 
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  }
}