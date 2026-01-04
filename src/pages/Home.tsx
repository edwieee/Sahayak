import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, GraduationCap, Briefcase, Scale, Shield, FileText, Bus,
  Search, Mic, MapPin, MicOff, ArrowRight, Paperclip, Send, Phone, ExternalLink, Navigation
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { startListening } from "@/utils/voice";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { loadLanguageData } from "@/utils/serviceData";
import { mockApi } from "@/utils/mockApi";
import { cn } from "@/lib/utils";
import { getNearestFacilityByCategory } from "@/utils/location";
import { Facility } from "@/types/services";

const CATEGORIES = [
  { id: "Healthcare", name: "Healthcare", icon: Heart, color: "bg-red-50 text-red-600 border-red-100" },
  { id: "Education", name: "Education", icon: GraduationCap, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: "Jobs", name: "Jobs", icon: Briefcase, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: "Legal Aid", name: "Legal Aid", icon: Scale, color: "bg-purple-50 text-purple-600 border-purple-100" },
  { id: "Government", name: "Government", icon: Shield, color: "bg-orange-50 text-orange-600 border-orange-100" },
  { id: "Documents", name: "Documents", icon: FileText, color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { id: "Transport", name: "Transport", icon: Bus, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
];

export default function Home() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearestFacilities, setNearestFacilities] = useState<Record<string, Facility>>({});

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const init = async () => {
      await loadLanguageData(language);
      setIsLoaded(true);

      // Request location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(loc);

            // Calculate nearest for each category
            const facilities: Record<string, Facility> = {};
            CATEGORIES.forEach(cat => {
              const nearest = getNearestFacilityByCategory(loc.lat, loc.lng, cat.id);
              if (nearest) {
                facilities[cat.id] = nearest;
              }
            });
            setNearestFacilities(facilities);
            toast.success("Location synced for nearest services");
          },
          (error) => {
            console.error("Location error:", error);
            toast.error("Could not access location. Using default views.");
          }
        );
      }
    };
    init();
  }, [language, token, navigate]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    startListening(
      (text) => {
        setSearchQuery(text);
        setIsListening(false);
        navigate(`/services?q=${encodeURIComponent(text)}`);
      },
      (err) => {
        setIsListening(false);
        toast.error("Could not understand. Please try again.");
      }
    );
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading Sahayak...</div>;

  return (
    <AppLayout status="core">
      <div className="flex-1 flex flex-col min-h-0 bg-background">

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-12 py-8 space-y-12">

          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 pt-16">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground">
              Namaste, {user?.username}!
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto">
              How can Sahayak help you today? Search for any verified scheme or document.
            </p>

            {/* Search Hub */}
            <div className="w-full max-w-3xl relative mt-10 group">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  className="h-16 w-full rounded-2xl bg-white border-2 border-border text-lg pl-6 pr-40 shadow-sm focus-visible:ring-primary focus-visible:border-primary"
                  placeholder="Search for Healthcare, Education, Jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleVoiceSearch}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      isListening ? "bg-red-500 text-white animate-pulse" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <Button type="submit" size="sm" className="h-10 px-6 rounded-xl font-bold shadow-md shadow-primary/20">
                    Search
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Categorized Content */}
          <div className="max-w-7xl mx-auto w-full pt-8">
            <div className="bg-card rounded-[2.5rem] border border-border p-8 lg:p-12 shadow-sm space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Browse Categories</h2>
                  <p className="text-sm text-muted-foreground font-medium">Find specialized services for your needs</p>
                </div>
                <Button variant="ghost" onClick={() => navigate('/services')} className="font-bold text-primary flex items-center gap-2">
                  Explore all
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Bento-style Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat, idx) => {
                  const nearest = nearestFacilities[cat.id];
                  const isFeatured = idx === 0 || idx === 3;

                  return (
                    <div
                      key={cat.id}
                      className={cn(
                        "rounded-[2.5rem] border-2 transition-all group shadow-sm bg-white overflow-hidden flex flex-col min-h-[240px]",
                        isFeatured ? "lg:col-span-2" : "lg:col-span-1",
                        cat.color.split(' ').slice(1).join(' ')
                      )}
                    >
                      <div
                        onClick={() => navigate(`/services/${cat.id}`)}
                        className="flex-1 p-8 cursor-pointer hover:bg-muted/5 transition-colors flex flex-col"
                      >
                        {/* Card Header: Icon and Badge */}
                        <div className="flex justify-between items-start mb-6">
                          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", cat.color.split(' ')[0])}>
                            <cat.icon className="h-7 w-7" />
                          </div>
                          {nearest && (
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2">
                              <MapPin className="h-3 w-3" />
                              <span className="text-[10px] font-black uppercase tracking-wider">Nearby</span>
                            </div>
                          )}
                        </div>

                        {/* Category Name */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-black tracking-tight leading-none mb-1">{cat.name}</h3>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-70">Verified Services</p>
                        </div>

                        {/* Featured Info (Nearest center details) */}
                        {nearest && isFeatured && (
                          <div className="mt-auto p-4 bg-muted/30 rounded-2xl border border-border/50 space-y-3 animate-in fade-in zoom-in-95">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border shadow-sm">
                                <Navigation className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">Nearest Center</p>
                                <p className="text-sm font-bold truncate">{nearest.name}</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 rounded-xl flex-1 font-bold text-xs bg-white hover:bg-primary hover:text-white transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`tel:${nearest.phone}`);
                                }}
                              >
                                <Phone className="h-3 w-3 mr-2" />
                                Call
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 rounded-xl flex-1 font-bold text-xs bg-white hover:bg-primary hover:text-white transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://www.google.com/maps/search/?api=1&query=${nearest.lat},${nearest.lng}`);
                                }}
                              >
                                <ExternalLink className="h-3 w-3 mr-2" />
                                Map
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Standard Footer for non-featured nearby */}
                        {nearest && !isFeatured && (
                          <div className="mt-auto pt-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-between h-11 px-4 rounded-xl font-bold bg-muted/20 hover:bg-muted/40 group/btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://www.google.com/maps/search/?api=1&query=${nearest.lat},${nearest.lng}`);
                              }}
                            >
                              <span className="truncate mr-2 text-xs">{nearest.name}</span>
                              <MapPin className="h-4 w-4 shrink-0 text-primary group-hover/btn:scale-110 transition-transform" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-8 text-center bg-muted/30 border-t mt-auto">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black">
            Sahayak Citizen Platform &copy; 2026
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
