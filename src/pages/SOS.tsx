import { Phone, MapPin, AlertTriangle, Heart, Shield, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const emergencyContacts = [
  { name: "Police", number: "100", icon: Shield, color: "bg-blue-500" },
  { name: "Ambulance", number: "108", icon: Heart, color: "bg-red-500" },
  { name: "Fire", number: "101", icon: AlertTriangle, color: "bg-orange-500" },
  { name: "Women Helpline", number: "181", icon: Phone, color: "bg-purple-500" },
  { name: "Child Helpline", number: "1098", icon: Phone, color: "bg-green-500" },
  { name: "Road Accident", number: "1073", icon: Car, color: "bg-yellow-500" },
];

export default function SOS() {
  return (
    <div className="min-h-screen bg-emergency-soft">
      {/* Header */}
      <header className="bg-emergency text-white p-4 safe-area-inset-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <h1 className="text-xl font-bold">Emergency Help</h1>
          </div>
          <Link 
            to="/home" 
            className="text-sm underline underline-offset-2"
          >
            Exit
          </Link>
        </div>
      </header>

      <main className="container-mobile py-6 space-y-6">
        {/* Main SOS Button */}
        <div className="text-center py-8">
          <button
            onClick={() => {
              // In real app, would send location to emergency contacts
              alert("Emergency services notified with your location");
            }}
            className="w-40 h-40 rounded-full bg-emergency text-white mx-auto flex flex-col items-center justify-center shadow-glow-emergency hover:scale-105 active:scale-95 transition-transform"
          >
            <AlertTriangle className="h-12 w-12 mb-2" />
            <span className="text-2xl font-bold">SOS</span>
            <span className="text-sm opacity-90">Tap for help</span>
          </button>
          
          <p className="mt-6 text-sm text-muted-foreground">
            This will share your location with emergency services
          </p>
        </div>

        {/* Share Location */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-info" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Share your location</p>
              <p className="text-sm text-muted-foreground">
                Send your live location to trusted contacts
              </p>
            </div>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Emergency Numbers</h2>
          <div className="grid grid-cols-2 gap-3">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="bg-card rounded-xl p-4 border border-border flex items-center gap-3 hover:border-primary/50 active:scale-[0.98] transition-all"
              >
                <div className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center`}>
                  <contact.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-lg font-bold text-primary">{contact.number}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Voice Help */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h3 className="font-semibold mb-2">Need voice guidance?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tell us what happened and we'll guide you step by step
          </p>
          <Button className="w-full" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Start Voice Help
          </Button>
        </div>

        {/* Safety Tips */}
        <div className="bg-muted rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Quick safety tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Stay calm and find a safe location
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              If injured, don't move unless in immediate danger
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Keep your phone charged and accessible
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Share your location with trusted contacts
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
