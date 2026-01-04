import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const freePlanFeatures = [
  "Voice-first AI assistance",
  "Phone number login (OTP)",
  "Healthcare, government & emergency services",
  "Step-by-step guidance",
  "Exact document lists",
  "One-tap call & maps",
  "SOS / Emergency mode",
  "Basic autonomous updates",
  "Offline SMS for critical alerts",
];

const plusPlanFeatures = [
  "Multiple languages",
  "Jobs, education & legal aid",
  "Unlimited service tracking",
  "Full autonomous updates",
  "WhatsApp + SMS notifications",
  "Conversational podcast-style audio",
  "Save & resume past requests",
  "Multiple saved locations",
];

export default function PricingSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <h2 className="text-subheading mb-3">
            Free for Everyone. Assisted for Those Who Need More.
          </h2>
          <p className="text-muted-foreground">
            Essential services are always accessible. Extra convenience is optional.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* FREE Plan */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col">
            <div className="mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 mb-3">
                Always Free
              </Badge>
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-muted-foreground text-sm">
                Access essential services without paying anything.
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-6">
              {freePlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="w-full h-12">
              <Link to="/auth">Start Free</Link>
            </Button>
          </div>

          {/* PLUS Plan */}
          <div className="bg-card rounded-2xl border-2 border-secondary/30 p-6 md:p-8 flex flex-col md:shadow-lg">
            <div className="mb-4">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0 mb-3">
                Optional
              </Badge>
              <h3 className="text-xl font-bold mb-2">Plus</h3>
              <p className="text-muted-foreground text-sm">
                Extra support for convenience, follow-ups, and multiple languages.
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-6">
              {plusPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-secondary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" size="lg" className="w-full h-12 border-secondary/30 hover:bg-secondary/5">
              <Link to="/plus">Learn About Plus</Link>
            </Button>
          </div>
        </div>

        {/* Trust Note */}
        <div className="mt-8 text-center max-w-xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Essential services are never locked behind a paywall.</span>
            <br />
            Plus helps fund free access for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
