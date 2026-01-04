import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { User, LogOut, Heart, Eye, MapPin, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getItemById } from "@/utils/serviceData";
import { mockApi } from "@/utils/mockApi";

export default function Profile() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const data = await mockApi.user.getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!dashboardData) return <div className="min-h-screen flex items-center justify-center">Loading Portal...</div>;

  return (
    <AppLayout status="core">
      <div className="container-mobile py-8 space-y-8">
        {/* User Profile Card */}
        <div className="flex items-center gap-4 p-6 bg-card border rounded-3xl shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{user?.username}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-destructive rounded-full">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Globe className="h-5 w-5" /> Account Details
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-2xl flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Language</span>
                <span className="font-bold text-sm uppercase">{user?.language}</span>
              </div>
              <div className="p-4 bg-muted/30 rounded-2xl flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Location Status</span>
                <span className="flex items-center gap-1 font-bold text-sm">
                  <MapPin className="h-3 w-3 text-emerald-500" />
                  {dashboardData.user?.latitude ? "Active" : "Not Set"}
                </span>
              </div>
            </div>
          </div>

          {/* Saved Interests */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" /> Saved Topics ({dashboardData.saved.length})
            </h3>
            <div className="space-y-3">
              {dashboardData.saved.length > 0 ? (
                dashboardData.saved.map((item: any) => {
                  const details = getItemById(item.content_id);
                  return (
                    <button
                      key={item.content_id}
                      onClick={() => navigate(`/service/${item.content_id}`)}
                      className="w-full p-4 bg-white border rounded-2xl flex items-center justify-between hover:border-primary transition-all text-left"
                    >
                      <span className="text-sm font-bold truncate pr-4">{details?.title || item.content_id}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground italic">No topics saved yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" /> Recently Viewed
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dashboardData.viewed.length > 0 ? (
              dashboardData.viewed.map((item: any) => {
                const details = getItemById(item.content_id);
                return (
                  <button
                    key={item.content_id + item.last_viewed_at}
                    onClick={() => navigate(`/service/${item.content_id}`)}
                    className="p-4 bg-card border rounded-2xl text-left hover:border-primary group transition-all"
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {new Date(item.last_viewed_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-bold line-clamp-1">{details?.title || item.content_id}</p>
                  </button>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground italic col-span-2">Your history is empty.</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
