import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { searchServices, getItemsByCategory, loadLanguageData } from "@/utils/serviceData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, FileText, Info, MapPin, Phone, ExternalLink, Navigation, Clock, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getNearestFacilityByCategory } from "@/utils/location";
import { Facility } from "@/types/services";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Services() {
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearestFacility, setNearestFacility] = useState<Facility | null>(null);

  const query = searchParams.get("q");

  useEffect(() => {
    const init = async () => {
      await loadLanguageData(language);
      setIsLoaded(true);

      // Get location
      if (category && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(loc);
            const nearest = getNearestFacilityByCategory(loc.lat, loc.lng, category);
            setNearestFacility(nearest);
          },
          (error) => {
            console.error("Location error:", error);
          }
        );
      }
    };
    init();
  }, [language, category]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  let items = [];
  let title = "Services";

  if (query) {
    items = searchServices(query);
    title = `Results for "${query}"`;
  } else if (category) {
    items = getItemsByCategory(category);
    title = category;
  }

  return (
    <AppLayout status="core">
      <div className="container-mobile py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{title}</h1>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{items.length} Services Available</p>
          </div>
        </div>

        {/* Bento Grid for Category Info */}
        {category && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
            {/* Main Nearest Facility Card */}
            <div className="lg:col-span-8 bg-primary/5 border-2 border-primary/10 rounded-[2rem] p-6 lg:p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform hidden sm:block">
                <MapPin className="h-24 w-24 text-primary" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">
                  <Navigation className="h-3 w-3" />
                  Nearest Center
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                    {nearestFacility ? nearestFacility.name : `Finding Nearest ${category} Center...`}
                  </h2>
                  <p className="text-sm lg:text-base text-muted-foreground font-medium flex items-center gap-1.5 mt-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {nearestFacility ? nearestFacility.address : "Please enable location to see nearby offices"}
                  </p>
                </div>
              </div>

              {nearestFacility && (
                <div className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
                  <Button
                    className="rounded-xl font-bold px-6 h-12 shadow-md shadow-primary/20 flex-1 sm:flex-initial"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${nearestFacility.lat},${nearestFacility.lng}`)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl font-bold bg-white h-12 flex-1 sm:flex-initial"
                    onClick={() => window.open(`tel:${nearestFacility.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {nearestFacility.phone}
                  </Button>
                </div>
              )}
            </div>

            {/* Side Info Cards */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] p-6 lg:p-8 flex flex-col justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-black text-orange-950 text-base">Normal Hours</h4>
                  <p className="text-xs lg:text-sm text-orange-700 font-bold uppercase tracking-wider">10 AM - 5 PM</p>
                </div>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] p-6 lg:p-8 flex flex-col justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-black text-emerald-950 text-base">Verified Office</h4>
                  <p className="text-xs lg:text-sm text-emerald-700 font-bold uppercase tracking-wider">Govt. Authorized</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground pt-4 px-2">List of Services</h3>
          {items.length > 0 ? (
            items.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/service/${item.id}`)}
                className="w-full p-4 bg-card border rounded-2xl flex items-center gap-4 text-left hover:border-primary transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-bold text-base truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Info className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-bold">No services found</p>
              <Button variant="outline" onClick={() => navigate("/home")} className="rounded-full">Back to Home</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
