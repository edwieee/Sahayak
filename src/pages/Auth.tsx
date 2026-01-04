import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Mail, Phone, ArrowRight, ArrowLeft, Shield, Globe, CheckCircle2, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { mockApi } from "@/utils/mockApi";

type AuthMode = "login" | "register";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
];

export default function Auth() {
  const navigate = useNavigate();
  const { login: setAuthData } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    language: "en"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data: any = mode === "login"
        ? await mockApi.auth.login(formData)
        : await mockApi.auth.register(formData);

      if (mode === "login") {
        setAuthData(data.token, data.user);
        toast.success(`Welcome back, ${data.user.username}!`);
        navigate("/home");
      } else {
        toast.success("Account created! Please login.");
        setMode("login");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* BRANDING SIDE - Visible only on Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-16 flex-col justify-between text-white relative">
        <div className="relative z-10 space-y-12">
          {/* Row 1: Logo and Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center p-1 bg-white">
              <img src="/logo.png" alt="Sahayak Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight uppercase opacity-90 leading-none">Sahayak</h2>
              <p className="text-[10px] font-bold tracking-[0.2em] opacity-70">INTELLIGENCE PLATFORM</p>
            </div>
          </div>

          {/* Row 2+: Pitch content */}
          <div className="space-y-8 pt-12">
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9] animate-fade-up">
              {mode === "login" ? "Transforming Access to Public Services" : "Join the Next Generation Public Help Desk"}
            </h1>
            <p className="text-xl font-medium opacity-80 leading-relaxed max-w-lg">
              OneTap Sahayak ensures that essential information is never out of reach.
              Voice-first, proactive, and human-verified.
            </p>
            <div className="space-y-4 pt-4">
              {[
                "Vocal support in 6+ languages",
                "Offline SMS & SOS support",
                "Autonomous background updates"
              ].map(point => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-bold tracking-tight">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs font-bold opacity-40 uppercase tracking-[0.4em]">
          &copy; 2026 Sahayak Intelligence Platform
        </div>

        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
      </div>

      {/* FORM SIDE */}
      <div className="flex-1 flex flex-col bg-white">
        <header className="p-4 lg:p-8 flex items-center justify-between lg:justify-end border-b lg:border-none">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center p-0.5 bg-primary">
              <img src="/logo.png" alt="Sahayak Logo" className="w-full h-full object-contain invert brightness-0" />
            </div>
            <span className="font-bold text-sm">Sahayak</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="font-bold text-muted-foreground hover:text-primary gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <p className="hidden lg:block text-xs text-muted-foreground font-bold uppercase tracking-widest">
              Secured Citizen Portal
            </p>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground font-medium">
              {mode === "login"
                ? "Login to access your personalized help desk"
                : "Join the platform for verified citizen information"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="username"
                  placeholder="Unique username"
                  className="pl-12 h-14 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-all"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-all"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {mode === "register" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-12 h-14 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-all"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="10 digit number"
                      className="pl-12 h-14 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-all"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Language</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                    <select
                      name="language"
                      className="flex h-14 w-full rounded-2xl border-2 border-input bg-background pl-12 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-all"
                      value={formData.language}
                      onChange={handleInputChange}
                      required
                    >
                      {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={isLoading}>
              {isLoading ? "Processing..." : mode === "login" ? "Login" : "Create Account"}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </form>

          <div className="text-center pt-4">
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm font-black text-primary hover:underline transition-all"
            >
              {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>

          <div className="p-6 bg-primary-soft rounded-[2rem] flex items-start gap-4 border-2 border-primary/5 shadow-inner">
            <Shield className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
              Secured with population-scale encryption. Your data is used only for verifying citizen status.
            </p>
          </div>
        </main>

        <footer className="p-8 text-center mt-auto lg:hidden">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em]">
            Secured Citizen Portal
          </p>
        </footer>
      </div>
    </div>
  );
}
