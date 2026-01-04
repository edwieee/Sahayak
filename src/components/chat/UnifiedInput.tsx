import { useState, useRef, useEffect } from "react";
import { Mic, Send, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface UnifiedInputProps {
    onSend: (text: string, isVoice: boolean) => void;
    isLoading?: boolean;
    className?: string;
    placeholder?: string;
}

export function UnifiedInput({ onSend, isLoading, className, placeholder }: UnifiedInputProps) {
    const { language } = useLanguage();
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
        }
    }, []);

    useEffect(() => {
        if (recognitionRef.current) {
            // Map our language codes to BCP 47 tags
            const langMap: Record<string, string> = {
                en: 'en-IN',
                hi: 'hi-IN',
                ml: 'ml-IN',
                ta: 'ta-IN',
                te: 'te-IN',
                bn: 'bn-IN'
            };
            recognitionRef.current.lang = langMap[language] || 'en-IN';
        }
    }, [language]);

    const startListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        setIsListening(true);
        recognitionRef.current.start();

        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            onSend(transcript, true);
            setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech verification error", event.error);
            setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const handleSend = () => {
        if (text.trim()) {
            onSend(text, false);
            setText("");
        }
    };

    return (
        <div className={cn("flex items-center gap-2 w-full", className)}>
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={placeholder || "Type or speak..."}
                className="flex-1 h-12 text-lg rounded-full px-6 shadow-sm border-2 focus-visible:ring-primary"
                disabled={isLoading || isListening}
            />

            {text.trim() ? (
                <Button
                    size="icon"
                    className="h-12 w-12 rounded-full shrink-0 animate-in zoom-in"
                    onClick={handleSend}
                    disabled={isLoading}
                >
                    <Send className="h-5 w-5" />
                </Button>
            ) : (
                <Button
                    size="icon"
                    variant={isListening ? "destructive" : "default"}
                    className={cn(
                        "h-12 w-12 rounded-full shrink-0 transition-all",
                        isListening ? "animate-pulse" : ""
                    )}
                    onClick={isListening ? stopListening : startListening}
                    disabled={isLoading}
                >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
            )}
        </div>
    );
}
