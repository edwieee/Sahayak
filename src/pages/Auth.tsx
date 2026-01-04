import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type AuthStep = "phone" | "otp" | "success";

export default function Auth() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length !== 10) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("success");
    
    // Redirect after success
    setTimeout(() => navigate("/language"), 1500);
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
      <main className="flex-1 container-mobile flex flex-col justify-center py-8 max-w-md mx-auto">
        {step === "phone" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-heading mb-2">Enter your phone number</h1>
              <p className="text-muted-foreground text-readable">
                We'll send you a one-time code to verify
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="10 digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="pl-24 h-14 text-lg"
                  inputMode="numeric"
                  autoFocus
                />
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={phone.length !== 10 || isLoading}
                className="w-full h-14 text-base"
              >
                {isLoading ? "Sending..." : "Send OTP"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* SMS fallback info */}
            <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
              <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Can't receive OTP?</span>{" "}
                We'll send a fallback SMS if network is slow.
              </p>
            </div>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-heading mb-2">Verify OTP</h1>
              <p className="text-muted-foreground text-readable">
                Enter the 6-digit code sent to +91 {phone}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={1} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={2} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={3} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={4} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={5} className="h-14 w-12 text-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
                className="w-full h-14 text-base"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>

              <button
                onClick={() => setStep("phone")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Change phone number
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-heading">Verified!</h1>
            <p className="text-muted-foreground">
              Redirecting you to select your language...
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </footer>
    </div>
  );
}
