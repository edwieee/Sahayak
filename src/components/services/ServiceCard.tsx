import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "emergency";
  className?: string;
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  variant = "default",
  className 
}: ServiceCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        variant === "emergency" ? "bento-card-emergency" : "bento-card",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
        variant === "emergency" 
          ? "bg-emergency text-emergency-foreground" 
          : "bg-primary-soft"
      )}>
        <Icon className={cn(
          "h-6 w-6",
          variant === "emergency" ? "text-white" : "text-primary"
        )} />
      </div>
      
      <h3 className={cn(
        "font-semibold text-center",
        variant === "emergency" ? "text-emergency" : "text-foreground"
      )}>
        {title}
      </h3>
      
      {description && (
        <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
          {description}
        </p>
      )}
    </Link>
  );
}
