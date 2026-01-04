import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  onStart?: () => void;
  onStop?: () => void;
  className?: string;
}

export function VoiceButton({ onStart, onStop, className }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    if (isListening) {
      setIsListening(false);
      onStop?.();
    } else {
      setIsListening(true);
      onStart?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn("voice-button", className)}
      aria-label={isListening ? "Stop listening" : "Start speaking"}
      aria-pressed={isListening}
    >
      {/* Pulse animation when listening */}
      {isListening && <div className="voice-button-pulse" />}
      {isListening && <div className="voice-button-pulse" style={{ animationDelay: "0.5s" }} />}
      
      {/* Icon */}
      {isListening ? (
        <MicOff className="h-8 w-8 md:h-10 md:w-10 relative z-10" />
      ) : (
        <Mic className="h-8 w-8 md:h-10 md:w-10 relative z-10" />
      )}
    </button>
  );
}
