import { AppLayout } from "@/components/layout/AppLayout";
import { User, Phone, Globe, Bell, Eye, Volume2, LogOut, ChevronRight, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: Phone, label: "+91 98765 43210", href: "#", type: "info" },
      { icon: Globe, label: "Language", value: "Hindi", href: "/language", type: "link" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Push notifications", id: "push", type: "toggle", defaultChecked: true },
      { icon: Bell, label: "SMS updates", id: "sms", type: "toggle", defaultChecked: true },
    ],
  },
  {
    title: "Accessibility",
    items: [
      { icon: Eye, label: "Large text", id: "largeText", type: "toggle", defaultChecked: false },
      { icon: Volume2, label: "Auto-play audio", id: "autoAudio", type: "toggle", defaultChecked: true },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      { icon: Shield, label: "Privacy settings", href: "/privacy", type: "link" },
    ],
  },
];

export default function Profile() {
  return (
    <AppLayout topBarTitle="Profile">
      <div className="container-mobile py-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Guest User</h2>
            <p className="text-sm text-muted-foreground">Verified via phone</p>
          </div>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {group.title}
              </h3>
              
              <div className="bg-card rounded-xl border border-border divide-y divide-border">
                {group.items.map((item, index) => {
                  const Icon = item.icon;
                  
                  if (item.type === "toggle") {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    );
                  }
                  
                  if (item.type === "link") {
                    return (
                      <Link
                        key={item.label}
                        to={item.href!}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.value && (
                            <span className="text-sm text-muted-foreground">
                              {item.value}
                            </span>
                          )}
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </Link>
                    );
                  }
                  
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-4"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full mt-8 p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex items-center justify-center gap-2 text-destructive font-medium hover:bg-destructive/10 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign out
        </button>

        {/* App version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          OneTap Sahayak v1.0.0
        </p>
      </div>
    </AppLayout>
  );
}
