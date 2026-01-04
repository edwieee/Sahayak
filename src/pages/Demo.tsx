import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight, Mic, Shield, Bell, Mail, Smartphone, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoSteps = [
  {
    id: 1,
    title: "1. User Asks a Question",
    description: "Enter a query using voice or text. Sahayak AI is designed for regional users with simple requirements.",
    hint: "Example: 'Explain today's healthcare scheme in simple terms'",
    type: "user"
  },
  {
    id: 2,
    title: "2. AI Responds (Simple Explainer)",
    description: "The AI breaks down complex info into friendly, step-by-step guidance in your local language.",
    type: "ai"
  },
  {
    id: 3,
    title: "3. Information Update Happens",
    description: "When rules or schemes change, Sahayak system automatically triggers an update message.",
    type: "system"
  },
  {
    id: 4,
    title: "4. Multi-Channel Notification",
    description: "Updates are delivered via App, SMS and Email to ensure you never miss critical information.",
    type: "deliver"
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleSkip = () => {
    navigate("/auth");
  };

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between safe-area-inset-top border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/home")} className="font-bold -ml-2">
            <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
            Back
          </Button>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-yellow-500/10 text-yellow-600 rounded-full border border-yellow-200">
            <span className="text-[10px] font-bold uppercase">Interactive Demo</span>
          </div>
        </div>
        <button onClick={handleSkip} className="text-sm font-bold text-muted-foreground hover:text-foreground">
          Skip to Signup
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 container-mobile py-8 flex flex-col">
        <div className="max-w-md mx-auto w-full space-y-8 flex-1">
          {/* Progress indicators */}
          <div className="flex gap-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
              />
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">{demoSteps[currentStep].title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {demoSteps[currentStep].description}
            </p>
          </div>

          {/* Interactive Visual Area */}
          <div className="flex-1 bg-muted/30 rounded-3xl border-2 border-dashed border-muted flex flex-col p-6 min-h-[350px]">
            {currentStep === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center ring-8 ring-primary/5">
                  <Mic className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border w-full max-w-[280px]">
                  <p className="text-sm italic text-center">"{demoSteps[0].hint}"</p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex-1 space-y-4 animate-in slide-in-from-right duration-500">
                <div className="bg-primary p-4 rounded-t-2xl rounded-br-2xl text-white text-sm max-w-[85%]">
                  Hello! Here is a simple explanation of the new Scheme:
                  <ul className="mt-2 space-y-2 list-disc list-inside opacity-90">
                    <li>First, you get free checkups.</li>
                    <li>Next, register with your Aadhaar card.</li>
                    <li>Finally, visit any government hospital.</li>
                  </ul>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold px-2">
                  Simplified AI Response
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-in fade-in scale-95 duration-500">
                <div className="bg-yellow-100 p-4 rounded-2xl border border-yellow-200 flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-sm font-bold text-yellow-800">System Update Triggered</p>
                    <p className="text-xs text-yellow-700">Rules for this scheme have changed.</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-yellow-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-500 animate-progress origin-left" />
                </div>
                <p className="text-center text-xs text-muted-foreground italic">
                  "Demo: represents real-time update delivery when information changes"
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex-1 space-y-4 animate-in slide-in-from-bottom duration-500">
                <div className="bg-white p-4 rounded-xl shadow-md border flex items-center gap-4">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold">App Notification</p>
                    <p className="text-[10px] text-muted-foreground">New update on your healthcare query.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border flex items-center gap-4">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-xs font-bold">Offline SMS</p>
                    <p className="text-[10px] text-muted-foreground">Alert: Step 2 process has been updated.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border flex items-center gap-4">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-xs font-bold">Email Summary</p>
                    <p className="text-[10px] text-muted-foreground">Detailed log of changes sent to your inbox.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t bg-card">
        <div className="max-w-md mx-auto">
          <Button onClick={nextStep} className="w-full h-14 text-base shadow-lg">
            {currentStep === demoSteps.length - 1 ? "Get Started Now" : "Continue Demo"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
