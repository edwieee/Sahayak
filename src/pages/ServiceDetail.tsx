import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, MapPin, Phone, MessageCircle, Clock, FileText, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock service data
const serviceData = {
  id: "1",
  name: "Primary Health Centre - Andheri",
  category: "Healthcare",
  description: "Government-run primary health centre providing basic healthcare services including vaccinations, maternal care, and common illness treatment.",
  address: "Andheri East, Mumbai - 400069",
  phone: "+91 22 2684 5678",
  hours: "Open 24/7",
  status: "open",
  distance: "1.2 km",
  
  eligibility: [
    "All Indian citizens",
    "BPL card holders get free treatment",
    "Ayushman Bharat beneficiaries",
  ],
  
  documents: [
    { name: "Aadhaar Card", required: true },
    { name: "BPL Card (for free treatment)", required: false },
    { name: "Ayushman Bharat Card", required: false },
  ],
  
  steps: [
    { title: "Visit the PHC", description: "Go to the registration counter" },
    { title: "Register at counter", description: "Provide your ID and get a token" },
    { title: "Wait for your turn", description: "Watch the display for your number" },
    { title: "Consult the doctor", description: "Get diagnosed and prescription" },
    { title: "Collect medicines", description: "Free medicines from pharmacy counter" },
  ],
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // In real app, fetch service by ID
  const service = serviceData;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border safe-area-inset-top">
        <div className="container-mobile flex items-center gap-3 h-14">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/services">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-semibold truncate">{service.name}</h1>
        </div>
      </header>

      <main className="container-mobile py-6 space-y-6">
        {/* Audio Summary */}
        <div className="bg-primary-soft rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0"
              aria-label={isPlaying ? "Pause audio" : "Play audio summary"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </button>
            <div>
              <p className="font-medium">Listen to summary</p>
              <p className="text-sm text-muted-foreground">
                2 min audio guide in your language
              </p>
            </div>
          </div>
          
          {isPlaying && (
            <div className="mt-4 h-1 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-primary rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-readable text-muted-foreground">
            {service.description}
          </p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl border border-border p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Distance</span>
            </div>
            <p className="font-semibold">{service.distance}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Hours</span>
            </div>
            <p className="font-semibold">{service.hours}</p>
          </div>
        </div>

        {/* Step-by-Step Guidance */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            How to use this service
          </h2>
          
          <div className="space-y-3">
            {service.steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-colors ${
                  index <= currentStep
                    ? "bg-secondary-soft border-secondary/30"
                    : "bg-card border-border"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    index <= currentStep ? "bg-secondary text-white" : "bg-muted"
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Needed */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Documents needed</h2>
          <div className="space-y-2">
            {service.documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
              >
                <Circle className={`h-5 w-5 ${doc.required ? "text-primary" : "text-muted-foreground"}`} />
                <span className={doc.required ? "font-medium" : "text-muted-foreground"}>
                  {doc.name}
                </span>
                {doc.required && (
                  <span className="ml-auto text-xs bg-primary-soft text-primary px-2 py-0.5 rounded-full">
                    Required
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Who can use</h2>
          <ul className="space-y-2">
            {service.eligibility.map((item) => (
              <li key={item} className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Offline notice */}
        <div className="p-4 bg-muted rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-info" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Going offline?</span>{" "}
            You'll receive updates via SMS.
          </p>
        </div>
      </main>

      {/* Fixed Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-md border-t border-border safe-area-inset-bottom">
        <div className="container-mobile flex gap-3">
          <Button variant="outline" size="lg" className="flex-1" asChild>
            <a href={`tel:${service.phone}`}>
              <Phone className="h-5 w-5 mr-2" />
              Call
            </a>
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <MapPin className="h-5 w-5 mr-2" />
            Directions
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
