import { useEffect, useRef, useState } from "react";
import { Mic, MessageSquare, MapPin, Phone, Navigation, Bell, Heart, FileText, Briefcase, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: 1,
        title: "Just speak in your language",
        description: "Voice-first. No typing needed.",
        icon: Mic,
        animation: "voice-wave"
    },
    {
        id: 2,
        title: "AI understands what you need",
        description: "Intent recognition in seconds.",
        icon: MessageSquare,
        animation: "intent-transform"
    },
    {
        id: 3,
        title: "Finds the right service near you",
        description: "Location-aware matching.",
        icon: MapPin,
        animation: "map-reveal"
    },
    {
        id: 4,
        title: "Call, navigate, or message instantly",
        description: "One-tap actions. No complexity.",
        icon: Phone,
        animation: "action-buttons"
    },
    {
        id: 5,
        title: "You're notified. Even without internet.",
        description: "SMS alerts keep you updated.",
        icon: Bell,
        animation: "notification-slide"
    }
];

const serviceIcons = [
    { Icon: Heart, color: "text-red-500" },
    { Icon: FileText, color: "text-blue-500" },
    { Icon: Briefcase, color: "text-emerald-500" },
    { Icon: Shield, color: "text-orange-500" }
];

export function DemoSection() {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Intersection Observer for scroll-based animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (!entry.isIntersecting) {
                    setIsAutoPlaying(false);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-play animation loop
    useEffect(() => {
        if (!isAutoPlaying || !isInView) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [isAutoPlaying, isInView]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
        setIsAutoPlaying(false);
    };

    return (
        <section
            ref={sectionRef}
            id="demo"
            className="pitch-section bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden"
        >
            <div className="pitch-content max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3 animate-fade-in">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                        How OneTap Sahayak Works
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                        From voice to real-world help — in seconds
                    </p>
                </div>

                {/* Demo Flow Container */}
                <div className="relative">
                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-12">
                        {steps.map((step, idx) => (
                            <button
                                key={step.id}
                                onClick={() => handleStepClick(idx)}
                                className={cn(
                                    "transition-all duration-500 rounded-full",
                                    activeStep === idx
                                        ? "w-8 md:w-12 h-2 md:h-3 bg-primary"
                                        : "w-2 md:w-3 h-2 md:h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                )}
                                aria-label={`Go to step ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Steps Display */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] md:min-h-[500px]">
                        {/* Left: Phone Mockup with Animations */}
                        <div className="flex items-center justify-center relative order-2 lg:order-1">
                            <PhoneMockup activeStep={activeStep} />
                        </div>

                        {/* Right: Step Details */}
                        <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                            {steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "transition-all duration-700 ease-out",
                                        activeStep === idx
                                            ? "opacity-100 translate-x-0 scale-100"
                                            : "opacity-0 translate-x-8 scale-95 absolute pointer-events-none"
                                    )}
                                >
                                    <div className="space-y-4 md:space-y-6">
                                        {/* Icon */}
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center">
                                            <step.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                                        </div>

                                        {/* Text */}
                                        <div className="space-y-2 md:space-y-3">
                                            <div className="flex items-start md:items-center gap-2 md:gap-3">
                                                <span className="text-3xl md:text-5xl lg:text-6xl font-black text-primary/20 leading-none">
                                                    {String(step.id).padStart(2, "0")}
                                                </span>
                                                <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium pl-10 md:pl-16 lg:pl-20">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length)}
                                    className="rounded-xl md:rounded-2xl font-bold text-xs md:text-sm h-10 md:h-12 px-4 md:px-6"
                                    disabled={activeStep === 0}
                                >
                                    Previous
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                                    className="rounded-xl md:rounded-2xl font-bold flex-1 text-xs md:text-sm h-10 md:h-12"
                                >
                                    {activeStep === steps.length - 1 ? "Start Over" : "Next Step"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center mt-12 md:mt-16 space-y-4 md:space-y-6 animate-fade-in">
                        <p className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight">
                            Help is now one tap away.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
                            <Button
                                size="lg"
                                className="h-12 md:h-14 px-8 md:px-12 rounded-full text-base md:text-lg font-black shadow-2xl hover:scale-105 transition-transform"
                                onClick={() => window.location.href = "/auth"}
                            >
                                Start Speaking
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 md:h-14 px-8 md:px-12 rounded-full text-base md:text-lg font-black hover:scale-105 transition-transform"
                                onClick={() => setActiveStep(0)}
                            >
                                Watch Again
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Phone Mockup Component with Step-based Animations
function PhoneMockup({ activeStep }: { activeStep: number }) {
    return (
        <div className="relative w-full max-w-[240px] md:max-w-xs mx-auto">
            {/* Phone Frame */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl border-4 md:border-8 border-gray-900">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-40 h-4 md:h-7 bg-gray-900 rounded-b-2xl md:rounded-b-3xl z-10" />

                {/* Screen */}
                <div className="relative bg-white rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden aspect-[9/19] shadow-inner">
                    {/* Step 1: Voice Wave */}
                    {activeStep === 0 && <VoiceWaveAnimation />}

                    {/* Step 2: Intent Transform */}
                    {activeStep === 1 && <IntentTransformAnimation />}

                    {/* Step 3: Map Reveal */}
                    {activeStep === 2 && <MapRevealAnimation />}

                    {/* Step 4: Action Buttons */}
                    {activeStep === 3 && <ActionButtonsAnimation />}

                    {/* Step 5: Notification */}
                    {activeStep === 4 && <NotificationAnimation />}
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-4 md:-right-8 top-1/4 w-10 h-10 md:w-16 md:h-16 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -left-4 md:-left-8 bottom-1/4 w-12 h-12 md:w-20 md:h-20 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
    );
}

// Animation Components for each step
function VoiceWaveAnimation() {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4 md:p-8">
            <div className="relative">
                {/* Microphone Icon */}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl animate-in zoom-in duration-500">
                    <Mic className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>

                {/* Voice Waves */}
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 md:border-4 border-primary/30 animate-ping"
                        style={{
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: "1.5s"
                        }}
                    />
                ))}
            </div>

            <p className="mt-6 md:mt-12 text-base md:text-2xl font-bold text-center text-muted-foreground animate-fade-in">
                "मुझे डॉक्टर चाहिए"
            </p>
        </div>
    );
}

function IntentTransformAnimation() {
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowIcons(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
            {/* Speech Bubble */}
            <div
                className={cn(
                    "bg-primary text-white px-4 py-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl rounded-bl-none shadow-lg transition-all duration-700",
                    showIcons ? "opacity-0 -translate-y-4 scale-90" : "opacity-100 translate-y-0 scale-100"
                )}
            >
                <p className="font-bold text-sm md:text-lg">Need a doctor</p>
            </div>

            {/* Service Icons */}
            <div
                className={cn(
                    "grid grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-12 transition-all duration-700",
                    showIcons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
            >
                {serviceIcons.map(({ Icon, color }, idx) => (
                    <div
                        key={idx}
                        className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white border-2 border-border flex items-center justify-center shadow-lg animate-in zoom-in"
                        style={{
                            animationDelay: `${idx * 150}ms`,
                            animationDuration: "500ms"
                        }}
                    >
                        <Icon className={cn("w-7 h-7 md:w-10 md:h-10", color)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function MapRevealAnimation() {
    const [showPin, setShowPin] = useState(false);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        const pinTimer = setTimeout(() => setShowPin(true), 400);
        const cardsTimer = setTimeout(() => setShowCards(true), 800);
        return () => {
            clearTimeout(pinTimer);
            clearTimeout(cardsTimer);
        };
    }, []);

    return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 p-3 md:p-6 flex flex-col">
            {/* Map Area */}
            <div className="flex-1 bg-white rounded-2xl md:rounded-3xl shadow-inner relative overflow-hidden border-2 border-border">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-6 grid-rows-6 h-full">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <div key={i} className="border border-gray-300" />
                        ))}
                    </div>
                </div>

                {/* Location Pin */}
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-700",
                        showPin ? "-translate-y-8 md:-translate-y-12 opacity-100" : "-translate-y-4 opacity-0"
                    )}
                >
                    <MapPin className="w-10 h-10 md:w-16 md:h-16 text-red-500 drop-shadow-lg animate-bounce" />
                </div>
            </div>

            {/* Service Cards */}
            <div
                className={cn(
                    "mt-2 md:mt-4 space-y-1.5 md:space-y-2 transition-all duration-700",
                    showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                {["City Hospital - 2.3 km", "Health Center - 3.1 km"].map((text, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-md border border-border flex items-center gap-2 md:gap-3 animate-in slide-in-from-bottom"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                            <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-[10px] md:text-sm truncate">{text}</p>
                        </div>
                        <Navigation className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ActionButtonsAnimation() {
    const [highlightedButton, setHighlightedButton] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHighlightedButton(0);
            setTimeout(() => setHighlightedButton(null), 1000);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const actions = [
        { icon: Phone, label: "Call Now", color: "bg-green-500" },
        { icon: Navigation, label: "Navigate", color: "bg-blue-500" },
        { icon: MessageSquare, label: "Message", color: "bg-purple-500" }
    ];

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
            {/* Service Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-border p-4 md:p-6 w-full max-w-xs mb-6 md:mb-12 animate-in fade-in zoom-in">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                    </div>
                    <div>
                        <h4 className="font-black text-sm md:text-lg">City Hospital</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">2.3 km away</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 md:space-y-4 w-full max-w-xs">
                {actions.map((action, idx) => (
                    <button
                        key={idx}
                        className={cn(
                            "w-full h-12 md:h-16 rounded-xl md:rounded-2xl font-bold text-white shadow-lg transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 animate-in slide-in-from-bottom text-sm md:text-base",
                            action.color,
                            highlightedButton === idx && "scale-105 ring-4 ring-primary/50"
                        )}
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <action.icon className="w-4 h-4 md:w-6 md:h-6" />
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function NotificationAnimation() {
    const [showNotification, setShowNotification] = useState(false);
    const [showSMS, setShowSMS] = useState(false);

    useEffect(() => {
        const notifTimer = setTimeout(() => setShowNotification(true), 300);
        const smsTimer = setTimeout(() => setShowSMS(true), 1000);
        return () => {
            clearTimeout(notifTimer);
            clearTimeout(smsTimer);
        };
    }, []);

    return (
        <div className="h-full bg-gradient-to-b from-background to-muted/20 p-3 md:p-6 pt-8 md:pt-16 relative">
            {/* Bell Icon */}
            <div className="flex justify-center mb-4 md:mb-8">
                <div className={cn(
                    "w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-xl transition-all duration-500",
                    showNotification && "animate-pulse"
                )}>
                    <Bell className="w-7 h-7 md:w-10 md:h-10 text-white" />
                </div>
            </div>

            {/* Notification Card */}
            <div
                className={cn(
                    "bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-border p-3 md:p-6 mb-2 md:mb-4 transition-all duration-700",
                    showNotification ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                )}
            >
                <div className="flex items-start gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-[10px] md:text-sm mb-0.5 md:mb-1">Service Update</p>
                        <p className="text-[9px] md:text-xs text-muted-foreground leading-relaxed">
                            City Hospital now open on Sundays. New timings: 8 AM - 8 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* SMS Card */}
            <div
                className={cn(
                    "bg-green-50 rounded-2xl md:rounded-3xl border-2 border-green-200 p-3 md:p-6 transition-all duration-700",
                    showSMS ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
            >
                <div className="flex items-start gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-[10px] md:text-sm mb-0.5 md:mb-1 text-green-900">SMS Alert</p>
                        <p className="text-[8px] md:text-xs text-green-700 leading-relaxed font-mono">
                            SAHAYAK: City Hospital updated. Open Sundays 8AM-8PM. Call 1800-XXX
                        </p>
                    </div>
                </div>
            </div>

            {/* SOS Badge */}
            <div className="absolute bottom-3 md:bottom-6 right-3 md:right-6">
                <div className="bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-[8px] md:text-xs font-black shadow-lg animate-pulse">
                    SOS READY
                </div>
            </div>
        </div>
    );
}
