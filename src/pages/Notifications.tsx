import { AppLayout } from "@/components/layout/AppLayout";
import { Bell, Play, AlertTriangle, CheckCircle2, Info, Clock } from "lucide-react";

const notifications = [
  {
    id: "1",
    title: "Ayushman Bharat card ready",
    message: "Your health card is ready for collection at PHC Andheri.",
    time: "2 hours ago",
    type: "success",
    unread: true,
  },
  {
    id: "2",
    title: "Document verification pending",
    message: "Please submit address proof for your ration card application.",
    time: "1 day ago",
    type: "warning",
    unread: true,
  },
  {
    id: "3",
    title: "Job interview scheduled",
    message: "Interview at ITI Andheri on Jan 20, 10:00 AM. Don't forget your resume.",
    time: "2 days ago",
    type: "info",
    unread: false,
  },
  {
    id: "4",
    title: "Scholarship deadline reminder",
    message: "Last date to apply for PM Vidya Lakshmi is Jan 25.",
    time: "3 days ago",
    type: "warning",
    unread: false,
  },
  {
    id: "5",
    title: "Application submitted",
    message: "Your legal aid request has been submitted successfully.",
    time: "1 week ago",
    type: "success",
    unread: false,
  },
];

const typeConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-secondary-soft",
    iconColor: "text-secondary",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning/10",
    iconColor: "text-warning",
  },
  info: {
    icon: Info,
    bgColor: "bg-info/10",
    iconColor: "text-info",
  },
};

export default function Notifications() {
  return (
    <AppLayout topBarTitle="Notifications">
      <div className="container-mobile py-4">
        {/* SMS fallback notice */}
        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl mb-6">
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <p className="text-sm">
            <span className="font-medium">SMS updates enabled.</span>{" "}
            <span className="text-muted-foreground">
              You'll receive updates even when offline.
            </span>
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type as keyof typeof typeConfig];
            const Icon = config.icon;
            
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-colors ${
                  notification.unread 
                    ? "bg-card border-primary/30" 
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${config.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {notification.unread && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                      <h3 className="font-semibold truncate">{notification.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </span>
                      
                      <button
                        className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                        onClick={() => {
                          // Play audio version
                        }}
                      >
                        <Play className="h-3 w-3" />
                        Listen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mark all read */}
        <button className="w-full text-center text-sm text-primary font-medium py-4 hover:underline">
          Mark all as read
        </button>
      </div>
    </AppLayout>
  );
}
