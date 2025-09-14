import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: "High" | "Medium" | "Low";
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-priority-high text-priority-high-foreground hover:bg-priority-high/90";
      case "Medium":
        return "bg-priority-medium text-priority-medium-foreground hover:bg-priority-medium/90";
      case "Low":
        return "bg-priority-low text-priority-low-foreground hover:bg-priority-low/90";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Badge 
      variant="secondary"
      className={cn(getPriorityStyles(priority), className)}
    >
      {priority}
    </Badge>
  );
};

export default PriorityBadge;