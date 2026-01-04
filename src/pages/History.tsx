import { AppLayout } from "@/components/layout/AppLayout";
import { Clock, ChevronRight, Play, CheckCircle2, AlertCircle, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

const historyItems = [
  {
    id: "1",
    title: "Ayushman Bharat Registration",
    date: "2024-01-15",
    status: "completed",
    category: "Healthcare",
  },
  {
    id: "2",
    title: "Ration Card Application",
    date: "2024-01-12",
    status: "in_progress",
    category: "Government",
  },
  {
    id: "3",
    title: "Job Application - ITI Placement",
    date: "2024-01-10",
    status: "pending",
    category: "Jobs",
  },
  {
    id: "4",
    title: "Legal Consultation Request",
    date: "2024-01-08",
    status: "completed",
    category: "Legal",
  },
  {
    id: "5",
    title: "Scholarship Application - PM Vidya",
    date: "2024-01-05",
    status: "in_progress",
    category: "Education",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "status-badge-success",
  },
  in_progress: {
    label: "In Progress",
    icon: Clock3,
    className: "status-badge-pending",
  },
  pending: {
    label: "Pending",
    icon: AlertCircle,
    className: "status-badge-offline",
  },
};

export default function History() {
  return (
    <AppLayout topBarTitle="My Requests">
      <div className="container-mobile py-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-secondary-soft rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-secondary">2</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="bg-warning/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-warning">2</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="bg-muted rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-muted-foreground">1</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {historyItems.map((item) => {
            const status = statusConfig[item.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <Link
                key={item.id}
                to={`/service/${item.id}`}
                className="service-card"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={status.className}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{item.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Play audio recap
                    }}
                    className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Replay audio"
                  >
                    <Play className="h-4 w-4 text-primary ml-0.5" />
                  </button>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state would go here */}
      </div>
    </AppLayout>
  );
}
