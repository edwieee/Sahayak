import { ArrowRight, Mic, Shield, Heart, GraduationCap, Briefcase, Scale, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Heart, label: "Healthcare", description: "Find hospitals, clinics & health schemes" },
  { icon: GraduationCap, label: "Education", description: "Schools, scholarships & skill programs" },
  { icon: Briefcase, label: "Jobs", description: "Employment opportunities near you" },
  { icon: Scale, label: "Legal Aid", description: "Free legal help & rights information" },
  { icon: Shield, label: "Government", description: "Schemes, documents & services" },
  { icon: Phone, label: "Emergency", description: "Instant help when you need it most" },
];

const steps = [
  { number: "1", title: "Speak", description: "Tell us what you need in your language" },
  { number: "2", title: "Get Guided", description: "Receive step-by-step voice assistance" },
  { number: "3", title: "Take Action", description: "Connect to services or get help" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient - subtle on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft to-background opacity-50 md:opacity-100" />
        
        <div className="relative container-mobile py-12 md:py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary flex items-center justify-center shadow-glow-primary">
                <span className="text-primary-foreground font-bold text-xl md:text-2xl">OT</span>
              </div>
              <span className="text-xl md:text-2xl font-bold text-foreground">OneTap Sahayak</span>
            </div>

            {/* Headline */}
            <h1 className="text-heading mb-4 md:mb-6">
              Help. <span className="text-primary">One Tap</span> Away.
            </h1>
            
            {/* Subtext */}
            <p className="text-readable text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto">
              Healthcare, government services, legal aid, and emergencies—guided in your language. 
              Speak your need, get instant help.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 h-14 shadow-glow-primary">
                <Link to="/auth">
                  <Mic className="h-5 w-5 mr-2" />
                  Start Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-14">
                <Link to="/demo">
                  Try Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container-mobile">
          <h2 className="text-subheading text-center mb-8 md:mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border"
              >
                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
                  {step.number}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                
                {/* Connector line - hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20">
        <div className="container-mobile">
          <h2 className="text-subheading text-center mb-2">
            What You Can Do
          </h2>
          <p className="text-muted-foreground text-center mb-8 md:mb-12">
            Essential services, one tap away
          </p>
          
          <div className="bento-grid max-w-4xl mx-auto">
            {features.map((feature) => (
              <div 
                key={feature.label}
                className="bento-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-center">{feature.label}</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container-mobile">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">10L+</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">22</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20">
        <div className="container-mobile text-center">
          <h2 className="text-subheading mb-4">
            Ready to Get Help?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            No complicated forms. Just speak and we'll guide you.
          </p>
          <Button asChild size="lg" className="text-base px-8 h-14">
            <Link to="/auth">
              <Mic className="h-5 w-5 mr-2" />
              Get Started Free
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container-mobile text-center text-sm text-muted-foreground">
          <p>© 2024 OneTap Sahayak. Built for everyone.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/help" className="hover:text-foreground transition-colors">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
