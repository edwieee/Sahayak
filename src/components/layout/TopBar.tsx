import { Globe, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface TopBarProps {
  showLanguage?: boolean;
  showNotifications?: boolean;
  title?: string;
  status?: "core" | "preview" | "planned";
}

export function TopBar({
  showLanguage = true,
  showNotifications = true,
  title,
  status
}: TopBarProps) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border safe-area-inset-top">
      <div className="container-mobile flex items-center justify-between h-14">
        {/* Logo / Title */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Link to="/home" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center p-0.5">
              <img src="/logo.png" alt="Sahayak Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {user && (
            <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              <User className="h-3 w-3" />
              {user.username}
            </div>
          )}

          <div className="flex items-center px-1.5 py-0.5 bg-green-500/10 text-green-600 rounded-md border border-green-200 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-tight">Verified Data</span>
          </div>
          <div className="hidden xs:flex items-center px-1.5 py-0.5 bg-blue-500/10 text-blue-600 rounded-md border border-blue-200 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-tight">Offline Ready</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {showLanguage && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/language" aria-label="Change language">
                <Globe className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-foreground relative"
            >
              <Link to="/notifications" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {/* Notification badge */}
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
