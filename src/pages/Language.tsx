import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
];

export default function Language() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const handlePlay = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(code);
    // Simulate audio playing
    setTimeout(() => setPlaying(null), 2000);
  };

  const handleContinue = () => {
    if (selected) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 safe-area-inset-top">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">OT</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container-mobile py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-heading mb-2">Choose your language</h1>
          <p className="text-muted-foreground text-readable mb-8">
            Select how you want to speak with us
          </p>

          {/* Language Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all",
                  "hover:border-primary/50 active:scale-[0.98]",
                  selected === lang.code
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-center gap-3">
                  {selected === lang.code && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-semibold">{lang.native}</div>
                    <div className="text-sm text-muted-foreground">{lang.name}</div>
                  </div>
                </div>

                {/* Audio preview button */}
                <button
                  onClick={(e) => handlePlay(lang.code, e)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    "hover:bg-muted",
                    playing === lang.code && "bg-primary text-primary-foreground"
                  )}
                  aria-label={`Preview ${lang.name}`}
                >
                  <Volume2 className={cn(
                    "h-5 w-5",
                    playing === lang.code && "animate-pulse"
                  )} />
                </button>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed bottom CTA */}
      <div className="sticky bottom-0 p-4 bg-background border-t border-border safe-area-inset-bottom">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="w-full h-14 text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
