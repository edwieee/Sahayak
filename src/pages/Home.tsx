import { Heart, GraduationCap, Briefcase, Scale, Shield, AlertTriangle, FileText, Bus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { VoiceButton } from "@/components/voice/VoiceButton";
import { ServiceCard } from "@/components/services/ServiceCard";
import { useState } from "react";

const services = [
  { icon: Heart, title: "Healthcare", description: "Hospitals & schemes", href: "/services/healthcare" },
  { icon: GraduationCap, title: "Education", description: "Schools & scholarships", href: "/services/education" },
  { icon: Briefcase, title: "Jobs", description: "Employment help", href: "/services/jobs" },
  { icon: Scale, title: "Legal Aid", description: "Free legal support", href: "/services/legal" },
  { icon: Shield, title: "Government", description: "Schemes & documents", href: "/services/government" },
  { icon: FileText, title: "Documents", description: "ID & certificates", href: "/services/documents" },
  { icon: Bus, title: "Transport", description: "Bus & train info", href: "/services/transport" },
  { icon: AlertTriangle, title: "Emergency", description: "Immediate help", href: "/sos", variant: "emergency" as const },
];

const hints = [
  "I need to find a hospital nearby",
  "Help me apply for Ayushman Bharat",
  "I lost my Aadhaar card",
  "Find jobs for me",
];

export default function Home() {
  const [currentHint, setCurrentHint] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceStart = () => {
    setIsListening(true);
    // Cycle through hints while listening
    const interval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % hints.length);
    }, 3000);
    
    // Store interval ID to clear later
    (window as any).__voiceHintInterval = interval;
  };

  const handleVoiceStop = () => {
    setIsListening(false);
    clearInterval((window as any).__voiceHintInterval);
  };

  return (
    <AppLayout>
      <div className="container-mobile py-6 md:py-10">
        {/* Greeting */}
        <div className="text-center mb-8">
          <h1 className="text-subheading mb-2">Hello! 👋</h1>
          <p className="text-muted-foreground text-readable">
            How can I help you today?
          </p>
        </div>

        {/* Voice Assistant Section */}
        <div className="flex flex-col items-center justify-center py-8 md:py-12">
          <VoiceButton 
            onStart={handleVoiceStart}
            onStop={handleVoiceStop}
          />
          
          <p className="mt-6 text-center text-muted-foreground">
            {isListening ? (
              <span className="text-primary font-medium animate-pulse-soft">
                Listening... speak now
              </span>
            ) : (
              "Tap and speak your need"
            )}
          </p>

          {/* Hint */}
          <div className="mt-4 px-4 py-2 bg-muted rounded-full">
            <p className="text-sm text-muted-foreground">
              Try: "<span className="text-foreground">{hints[currentHint]}</span>"
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="bento-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                variant={service.variant}
                className={`md:animate-fade-up md:opacity-0 stagger-${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Offline indicator */}
        <div className="mt-8 p-4 bg-muted rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Offline mode available.</span>{" "}
            Get updates via SMS when you're not connected.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
