import { ArrowRight, Mic, Shield, Bell, Zap, Globe, Heart, GraduationCap, Briefcase, Scale, Smartphone, MessageSquare, AlertCircle, ChevronDown, CheckCircle2, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const slides = [
    {
        id: "hero",
        title: "A Digital Help Desk. Personalized for You.",
        subtitle: "Sahayak Portal",
        description: "An inclusive, action-oriented AI platform designed to bridge the gap between people and essential services.",
        theme: "bg-primary text-white",
    },
    {
        id: "problem",
        title: "The Problem",
        description: "The primary challenge isn't the absence of information, but the inability to discover, understand, and act on it.",
        points: [
            "Language Barriers",
            "Low Digital Literacy",
            "Fragmented Systems",
            "Unreliable Connectivity"
        ],
        theme: "bg-background text-foreground",
    },
    {
        id: "solution",
        title: "Voice-First Solution",
        description: "Built for real-world simplicity. Speak your need in your preferred local language.",
        icon: Mic,
        points: [
            "Interprets Intent",
            "Identifies Nearby Services",
            "Simple, Non-technical Guidance"
        ],
        theme: "bg-primary-soft text-foreground",
    },
    {
        id: "action",
        title: "Direct Action Enablement",
        description: "We don't just explain; we enable immediate results.",
        points: [
            "One-Tap Calling",
            "Map Navigation",
            "Direct Messaging"
        ],
        theme: "bg-secondary text-white",
    },
    {
        id: "proactive",
        title: "Proactive Relationship",
        description: "The system monitors services in the background and alerts you to every change.",
        icon: Zap,
        points: [
            "Timing & Rule Changes",
            "Eligibility Updates",
            "Document Requirements",
            "Upcoming Deadlines"
        ],
        theme: "bg-foreground text-background",
    },
    {
        id: "infrastructure",
        title: "Social Infrastructure",
        description: "Designed for rural and semi-urban environments where reliability matters most.",
        points: [
            "Phone-Number Based Auth",
            "Offline SMS Support",
            "Rapid SOS Mode",
            "Location Sharing"
        ],
        theme: "bg-background text-foreground",
    },
    {
        id: "audio",
        title: "Conversational Audio",
        description: "Guidance delivered as short, friendly two-person conversations.",
        icon: Headphones,
        points: [
            "Podcast-style Explaners",
            "Improved Engagement",
            "Elderly Friendly"
        ],
        theme: "bg-primary-soft text-foreground",
    }
];

const plans = [
    {
        name: "Free",
        tagline: "Always Free",
        description: "Access essential services without paying anything.",
        features: [
            "Voice-first AI assistance",
            "Phone number login (OTP)",
            "Essential Healthcare & Government services",
            "Step-by-step guidance",
            "One-tap call & maps",
            "SOS / Emergency mode",
            "Offline SMS for critical alerts"
        ],
        buttonText: "Start Free",
        theme: "border-border",
        buttonTheme: "bg-primary"
    },
    {
        name: "Plus",
        tagline: "Optional",
        description: "Extra support for convenience and multiple languages.",
        features: [
            "Multiple languages",
            "Jobs, Education & Legal aid",
            "Unlimited service tracking",
            "Full autonomous updates",
            "WhatsApp + SMS notifications",
            "Podcast-style audio tutorials",
            "Multiple saved locations"
        ],
        buttonText: "Learn About Plus",
        theme: "border-secondary border-2",
        buttonTheme: "bg-secondary"
    }
];

const faqs = [
    { q: "Is OneTap Sahayak free to use?", a: "Yes, essential services are always free." },
    { q: "What is the Plus plan?", a: "A tier that funds free access while providing convenience features." },
    { q: "Do I need to know how to use smartphones?", a: "No, it's designed to be used primarily via voice." },
    { q: "Can I use it without internet?", a: "Yes, critical updates are sent via SMS." },
    { q: "How does the SOS feature work?", a: "It provides instant location sharing and voice instructions." }
];

export default function Landing() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Persistent Header */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-b z-[100] flex items-center px-6 lg:px-12">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                            <img src="/logo.png" alt="Sahayak Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-primary">Sahayak</span>
                    </div>
                    <div className="flex items-center gap-8 lg:gap-12">
                        <nav className="hidden md:flex items-center gap-10">
                            <a href="#problem" className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center h-20">Problem</a>
                            <a href="#solution" className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center h-20">Solution</a>
                            <a href="#pricing" className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center h-20">Pricing</a>
                        </nav>
                        <div className="h-6 w-px bg-border hidden md:block" />
                        <div className="flex items-center h-20">
                            <Button asChild className="rounded-full font-black px-8 h-12 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95 leading-none">
                                <Link to="/auth">Login</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section - Split Layout on Desktop */}
            <section className="pitch-section bg-primary text-white lg:min-h-screen">
                <div className="pitch-content lg:max-w-7xl">
                    <div className="pitch-grid">
                        {/* Left Column: Branding row and Title row */}
                        <div className="space-y-12 text-left">
                            {/* Row 1: Logo and Name */}
                            <div className="flex items-center gap-4 animate-fade-in">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl p-1.5">
                                    <img src="/logo.png" alt="Sahayak Logo" className="w-full h-full object-contain" />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-2xl font-black tracking-tight uppercase opacity-90">Sahayak</h2>
                                    <p className="text-xs font-bold tracking-[0.2em] opacity-70">INTELLIGENCE PLATFORM</p>
                                </div>
                            </div>

                            {/* Row 2: Big Title and Content */}
                            <div className="space-y-8">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] animate-fade-up">
                                    {slides[0].title}
                                </h1>
                                <p className="text-xl md:text-2xl font-medium opacity-90 leading-snug max-w-xl animate-fade-up stagger-2">
                                    {slides[0].description}
                                </p>
                                <div className="pt-8 flex flex-wrap gap-4 animate-fade-up stagger-3">
                                    <Button asChild size="lg" className="h-16 px-10 rounded-full text-xl shadow-2xl bg-white text-primary hover:bg-white/90 scale-105 transition-transform">
                                        <Link to="/auth">
                                            Get Started Now
                                            <ArrowRight className="ml-2 h-6 w-6" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="h-16 px-8 rounded-full text-xl border-white text-white hover:bg-white/10">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Hero Illustration */}
                        <div className="hidden lg:flex items-center justify-center animate-fade-in stagger-4 relative px-12 py-8">
                            {/* Static Green Background Rectangle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] bg-secondary rounded-[4rem] shadow-2xl shadow-secondary/20" />

                            {/* Tilted Hero Illustration Card */}
                            <div className="relative z-10 bg-white rounded-[4rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out border-[12px] border-white overflow-hidden aspect-square max-w-lg">
                                <img
                                    src="/hero-illustration.jpg"
                                    alt="Sahayak Community Support Illustration"
                                    className="w-full h-full object-cover scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Following Sections using improved grid distribution */}
            {slides.slice(1).map((slide, idx) => (
                <section key={slide.id} id={slide.id} className={`pitch-section ${slide.theme} border-t border-black/5`}>
                    <div className="pitch-content max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6 text-left">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{slide.title}</h2>
                                <p className="text-xl md:text-2xl font-medium opacity-80 leading-relaxed">{slide.description}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {slide.points?.map((point) => (
                                    <div key={point} className="flex items-center gap-4 p-5 glass rounded-3xl border border-white/10 shadow-lg">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <span className="font-bold text-lg tracking-tight">{point}</span>
                                    </div>
                                ))}
                                {slide.icon && (
                                    <div className="hidden lg:flex justify-center p-12">
                                        <slide.icon className="w-32 h-32 opacity-15" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Pricing Slide - Split Layout on Desktop */}
            <section id="pricing" className="pitch-section bg-white text-foreground">
                <div className="pitch-content max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                        <div className="lg:col-span-1 space-y-6 text-left">
                            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">Ethical Access Model</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">Essential services remain free. Forever. Funded by those who need more.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-8">
                            {plans.map((plan) => (
                                <div key={plan.name} className={`p-8 rounded-[3rem] flex flex-col space-y-6 shadow-2xl border ${plan.theme} bg-white hover:scale-105 transition-transform duration-300`}>
                                    <div className="space-y-2">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${plan.name === 'Free' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                            {plan.tagline}
                                        </span>
                                        <h3 className="text-5xl font-black tracking-tighter">{plan.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground font-medium">{plan.description}</p>
                                    <div className="flex-1 space-y-4">
                                        {plan.features.map((f) => (
                                            <div key={f} className="flex items-start gap-3">
                                                <CheckCircle2 className={`h-6 w-6 shrink-0 mt-0.5 ${plan.name === 'Free' ? 'text-primary' : 'text-secondary'}`} />
                                                <span className="text-sm font-bold tracking-tight">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className={`h-16 rounded-2xl text-xl font-black text-white ${plan.buttonTheme} shadow-xl`}>
                                        {plan.buttonText}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Slide */}
            <section className="pitch-section bg-muted/20">
                <div className="pitch-content max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">FAQ</h2>
                        <p className="text-xl text-muted-foreground font-medium">Clear answers for real concerns.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border-2 rounded-[2rem] overflow-hidden transition-all shadow-sm hover:shadow-md">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-8 text-left flex justify-between items-center hover:bg-muted/5 transition-colors"
                                >
                                    <span className="font-bold text-xl tracking-tight">{faq.q}</span>
                                    <ChevronDown className={`h-6 w-6 transition-transform duration-500 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-8 pt-0 text-lg font-medium text-muted-foreground border-t-2 border-dashed bg-muted/5 leading-relaxed">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="pitch-section bg-foreground text-background text-center py-40">
                <div className="pitch-content max-w-5xl mx-auto space-y-12 px-6">
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8]">Ready to take action?</h2>
                    <p className="text-2xl md:text-4xl font-medium opacity-80 max-w-3xl mx-auto leading-tight">
                        Join the inclusive social infrastructure built for real-world impact. No more information gaps.
                    </p>
                    <div className="pt-12">
                        <Button asChild size="lg" className="h-24 px-16 rounded-full text-3xl font-black shadow-2xl bg-primary text-white hover:bg-primary/90 hover:scale-110 transition-transform">
                            <Link to="/auth">
                                Enter Portal Now
                                <ArrowRight className="ml-4 h-10 w-10" />
                            </Link>
                        </Button>
                    </div>
                    <p className="pt-24 text-xs font-black uppercase tracking-[0.4em] opacity-40">
                        OneTap Sahayak &copy; 2026 | Social Infrastructure Platform
                    </p>
                </div>
            </section>
        </div>
    );
}
