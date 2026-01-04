import { AppLayout } from "@/components/layout/AppLayout";
import { Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();

  return (
    <AppLayout status="planned">
      <div className="container-mobile py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
          <Clock className="h-10 w-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Search History</h1>
          <p className="text-muted-foreground text-readable max-w-xs mx-auto">
            This feature will be expanded in future versions to help you track your previous searches offline.
          </p>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3 text-left max-w-sm mx-auto">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Currently, Sahayak focuses on providing instant, verified information without storing your personal data.
          </p>
        </div>

        <Button onClick={() => navigate("/home")} className="rounded-full px-8">
          Back to Home
        </Button>
      </div>
    </AppLayout>
  );
}
