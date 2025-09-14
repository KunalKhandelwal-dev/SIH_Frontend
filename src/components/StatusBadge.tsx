import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Solved" | "Under Process" | "Not Started";
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Solved":
        return "bg-status-solved text-status-solved-foreground hover:bg-status-solved/90";
      case "Under Process":
        return "bg-status-process text-status-process-foreground hover:bg-status-process/90";
      case "Not Started":
        return "bg-status-not-started text-status-not-started-foreground hover:bg-status-not-started/90";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Badge 
      variant="secondary" 
      className={cn(getStatusStyles(status), className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;