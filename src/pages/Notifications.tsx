import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Bell, Info, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getItemById } from "@/utils/serviceData";
import { mockApi } from "@/utils/mockApi";

export default function Notifications() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const data = await mockApi.user.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, [token, navigate]);

  return (
    <AppLayout status="core">
      <div className="container-mobile py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Your Notifications</h1>
            <p className="text-xs text-muted-foreground">{notifications.length} alerts available</p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => {
              const details = n.content_id ? getItemById(n.content_id) : null;
              return (
                <div
                  key={n.notification_id}
                  className="p-4 bg-card border rounded-2xl space-y-3 relative group overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider">Content Update</p>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(n.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{n.message}</p>

                  {details && (
                    <button
                      onClick={() => navigate(`/service/${n.content_id}`)}
                      className="flex items-center justify-between w-full p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all"
                    >
                      <span className="text-xs font-bold">{details.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">All caught up!</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  When government information you follow is updated, we will alert you here.
                </p>
              </div>
              <Button onClick={() => navigate("/home")} className="rounded-full px-8">
                Explore Services
              </Button>
            </div>
          )}
        </div>

        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Sahayak Portal automatically tracks your "Interested" topics to keep you informed about critical weekly changes.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
