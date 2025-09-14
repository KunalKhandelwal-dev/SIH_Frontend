import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriorityBadge from "@/components/PriorityBadge";
import StatusBadge from "@/components/StatusBadge";
import { Search, Train } from "lucide-react";

// Define train type
interface Train {
  train_id: string;
  train_route: string;
  priority: "High" | "Medium" | "Low";
  status: "Solved" | "Under Process" | "Not Started";
}

const API_BASE =  import.meta.env.VITE_API_BASE;

const TrainListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch train data from backend API
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const res = await fetch(`${API_BASE}/trainData`);
        const data = await res.json();
        setTrains(data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, []);

  // Filter trains based on search term
  const filteredTrains = trains.filter(
    (train) =>
      train.train_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.train_route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrainClick = (trainId: string) => {
    navigate(`/train/${trainId}`);
  };

  if (loading) {
    return <div className="p-6">Loading train data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Here's a quick overview of your Dashboard
        </p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by train ID or route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 bg-muted/30 focus:bg-background"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Train className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Reports
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {trains.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Train className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Trains
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {trains.filter((train) => train.status !== "Solved").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Train className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Under Process
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {trains.filter((train) => train.status === "Under Process").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Train className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  High Priority
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {trains.filter((train) => train.priority === "High").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Fault Reports
            </CardTitle>
            <div className="text-sm text-primary cursor-pointer hover:underline">
              View all
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredTrains.length > 0 ? (
              filteredTrains.slice(0, 8).map((train) => (
                <div
                  key={train.train_id}
                  className="p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => handleTrainClick(train.train_id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Train className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Train {train.train_id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {train.train_route}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PriorityBadge priority={train.priority} />
                      <StatusBadge status={train.status} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No trains found matching your search.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainListPage;
