import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { Home, Search, History, User, Globe, HelpCircle, Star, Users, Layout, Disc, GraduationCap, Briefcase } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  showTopBar?: boolean;
  showBottomNav?: boolean;
  topBarTitle?: string;
  status?: "core" | "preview" | "planned";
}

export function AppLayout({
  children,
  showTopBar = true,
  showBottomNav = true,
  topBarTitle,
  status
}: AppLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/services" },
  ];

  const projectItems = [
    { icon: Layout, label: "All services", path: "/services" },
    { icon: Star, label: "Starred", path: "/history" }, // Reusing history for starred
    { icon: Users, label: "Shared with me", path: "/notifications" },
  ];

  const resourceItems = [
    { icon: Disc, label: "Discover", path: "/home" },
    { icon: GraduationCap, label: "Learn", path: "/demo" },
    { icon: HelpCircle, label: "History", path: "/history" },
  ];
  return (
    <div className="min-h-screen bg-background flex">
      {/* Side Panel - Desktop Only */}
      <aside className="hidden lg:flex w-72 bg-card text-card-foreground flex-col shrink-0 border-r border-border">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-1">
              <img src="/logo.png" alt="Sahayak Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-foreground leading-none text-xl">Sahayak</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-6 mt-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <p className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Services</p>
            <div className="space-y-1">
              {projectItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <item.icon className="h-5 w-5 opacity-70" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <p className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Resources</p>
            <div className="space-y-1">
              {resourceItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <item.icon className="h-5 w-5 opacity-70" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 mt-auto space-y-3">
          <div className="p-4 bg-muted/50 rounded-2xl border border-border space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-foreground">Language Select</span>
              <Globe className="h-4 w-4 text-primary" />
            </div>
            <Button variant="outline" size="sm" asChild className="w-full justify-start font-bold border-2">
              <Link to="/language">Change Language</Link>
            </Button>
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase text-sm">
              {user?.username?.[0] || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.username || 'Guest'}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Citizen Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {showTopBar && (
          <div className="lg:hidden">
            <TopBar title={topBarTitle} status={status} />
          </div>
        )}

        <main className={cn(
          "flex-1 flex flex-col",
          showBottomNav && "pb-20 lg:pb-0"
        )}>
          {children}
        </main>

        {showBottomNav && (
          <div className="lg:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
