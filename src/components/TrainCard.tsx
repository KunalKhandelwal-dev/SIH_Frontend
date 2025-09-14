import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import { Train, MapPin } from "lucide-react";

interface TrainCardProps {
  train: {
    train_id: string;
    train_route: string;
    priority: "High" | "Medium" | "Low";
    status: "Solved" | "Under Process" | "Not Started";
    fault_locations: string[];
  };
  onClick: () => void;
}

const TrainCard = ({ train, onClick }: TrainCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20 group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Train className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                Train {train.train_id}
              </h3>
              <div className="flex items-center space-x-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{train.train_route}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <PriorityBadge priority={train.priority} />
            <StatusBadge status={train.status} />
          </div>
          
          {train.fault_locations.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {train.fault_locations.length} fault{train.fault_locations.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;