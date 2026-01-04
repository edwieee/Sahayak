import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Volume2, MapPin,
  CheckCircle2, FileText, UserCheck,
  AlertTriangle, Phone, ExternalLink, Heart, Eye
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { getItemById } from "@/utils/serviceData";
import { MOCK_FACILITIES, calculateDistance } from "@/utils/location";
import { speak, stopSpeaking } from "@/utils/voice";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { mockApi } from "@/utils/mockApi";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [nearestFacility, setNearestFacility] = useState<any>(null);

  const item = getItemById(id || "");

  useEffect(() => {
    if (item && token) {
      // Mark as Viewed
      mockApi.user.logActivity(item.id, "viewed");

      // Find nearest facility
      const facilitiesOfType = MOCK_FACILITIES.filter(f => f.type === item.facility_type);
      const userLoc = { lat: 10.33, lng: 76.20 }; // default

      if (facilitiesOfType.length > 0) {
        const withDist = facilitiesOfType.map(f => ({
          ...f,
          distance: calculateDistance(userLoc.lat, userLoc.lng, f.lat, f.lng)
        })).sort((a, b) => a.distance - b.distance);
        setNearestFacility(withDist[0]);
      }
    }

    return () => stopSpeaking();
  }, [item, token]);

  const handleSave = async () => {
    if (!token) return;
    try {
      await mockApi.user.logActivity(item?.id || "", "saved");
      setIsSaved(true);
      toast.success("Added to your interests! You'll be notified of updates.");
    } catch (e) {
      toast.error("Failed to save interest");
    }
  };

  if (!item) return <div>Service not found</div>;

  const handleListen = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    const textToSpeak = `${item.title}. ${item.description}. Steps: ${item.steps.join(". ")}. Note: ${item.notes}.`;
    setIsPlaying(true);
    speak(textToSpeak, () => setIsPlaying(false));
  };

  return (
    <AppLayout status="core">
      <div className="container-mobile py-6 space-y-6 pb-24">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={isSaved ? "secondary" : "outline"}
              className={`rounded-full gap-2 ${isSaved ? "bg-red-50 text-red-600 border-red-100" : ""}`}
              onClick={handleSave}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Interested" : "Mark Interest"}
            </Button>
            <Button size="sm" variant={isPlaying ? "destructive" : "outline"} className="rounded-full gap-2" onClick={handleListen}>
              <Volume2 className={`h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
              {isPlaying ? "Stop" : "Listen"}
            </Button>
          </div>
        </div>

        {/* Hero */}
        <div className="space-y-3">
          <div className="inline-flex px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
            {item.category}
          </div>
          <h1 className="text-2xl font-bold leading-tight">{item.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        {/* Facility Card */}
        {nearestFacility && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wide">Nearest physical help</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-emerald-600 rounded-full">
                ~{nearestFacility.distance.toFixed(1)} km
              </span>
            </div>
            <div>
              <h4 className="font-bold text-emerald-900">{nearestFacility.name}</h4>
              <p className="text-xs text-emerald-800/80">{nearestFacility.address}</p>
            </div>
          </div>
        )}

        {/* Details Sections */}
        <div className="space-y-6">
          <section className="space-y-3">
            <h3 className="font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Steps to Follow
            </h3>
            <div className="space-y-4 ml-2 border-l-2 border-muted pl-6">
              {item.steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-5 bg-card border rounded-3xl space-y-3">
            <h3 className="font-bold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              Documents Needed
            </h3>
            <ul className="grid grid-cols-1 gap-2">
              {item.documents_required.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 text-sm p-3 bg-muted/30 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {doc}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-5 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-2">
            <h3 className="font-bold flex items-center gap-2 text-blue-700 flex-col sm:flex-row">
              <UserCheck className="h-5 w-5 text-blue-600" />
              Eligibility Criteria
            </h3>
            <p className="text-sm text-blue-800/90 leading-relaxed italic">
              {item.eligibility}
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
