import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight, Mic, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoSteps = [
  {
    id: 1,
    title: "Voice Assistant",
    description: "Tell us what you need in your language. Our AI understands Hindi, Tamil, Bengali and 19+ languages.",
    action: "Try speaking: 'I need a hospital nearby'",
  },
  {
    id: 2,
    title: "Get Guidance",
    description: "Receive step-by-step voice guidance for any service - healthcare, government schemes, legal aid.",
    action: "We'll show you exactly what to do",
  },
  {
    id: 3,
    title: "Take Action",
    description: "Call, navigate, or get connected to the right service instantly.",
    action: "One tap to get help",
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && currentStep < demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep]);

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between safe-area-inset-top">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">OT</span>
          </div>
          <span className="font-semibold text-sm">Demo Mode</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip demo
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 container-mobile flex flex-col justify-center py-8">
        <div className="max-w-lg mx-auto w-full">
          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {demoSteps.map((step, index) => (
              <div
                key={step.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-primary w-8"
                    : "bg-muted w-2"
                }`}
              />
            ))}
          </div>

          {/* Current step */}
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-soft flex items-center justify-center">
              {currentStep === 0 && <Mic className="h-12 w-12 text-primary" />}
              {currentStep === 1 && <Play className="h-12 w-12 text-primary" />}
              {currentStep === 2 && <CheckCircle2 className="h-12 w-12 text-primary" />}
            </div>

            {/* Step content */}
            <div className="space-y-3">
              <h1 className="text-heading">
                {demoSteps[currentStep].title}
              </h1>
              <p className="text-readable text-muted-foreground max-w-md mx-auto">
                {demoSteps[currentStep].description}
              </p>
            </div>

            {/* Action hint */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {demoSteps[currentStep].action}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTAs */}
      <div className="p-4 safe-area-inset-bottom">
        <div className="max-w-lg mx-auto space-y-3">
          {!isPlaying ? (
            <Button onClick={handleStart} className="w-full h-14 text-base">
              <Play className="h-5 w-5 mr-2" />
              Start Demo
            </Button>
          ) : currentStep === demoSteps.length - 1 ? (
            <Button onClick={() => navigate("/auth")} className="w-full h-14 text-base">
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              variant="outline"
              className="w-full h-14 text-base"
            >
              Next Step
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          )}

          {isPlaying && currentStep < demoSteps.length - 1 && (
            <Button
              onClick={() => navigate("/auth")}
              variant="ghost"
              className="w-full h-12"
            >
              Skip to signup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
