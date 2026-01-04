import { Globe, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  showLanguage?: boolean;
  showNotifications?: boolean;
  title?: string;
}

export function TopBar({ 
  showLanguage = true, 
  showNotifications = true,
  title 
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border safe-area-inset-top">
      <div className="container-mobile flex items-center justify-between h-14">
        {/* Logo / Title */}
        <Link to="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">OT</span>
          </div>
          {title ? (
            <h1 className="font-semibold text-foreground truncate max-w-[200px]">
              {title}
            </h1>
          ) : (
            <span className="font-semibold text-foreground hidden sm:inline">
              OneTap Sahayak
            </span>
          )}
        </Link>

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
