import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/StatusBadge";
import PriorityBadge from "@/components/PriorityBadge";
import { ArrowLeft, Train, MapPin, AlertTriangle, Image as ImageIcon, Video } from "lucide-react";

const API_BASE =  import.meta.env.VITE_API_BASE;

const TrainDetailPage = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/trainData/${trainId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Train not found");
        return res.json();
      })
      .then((data) => {
        setTrain(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [trainId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading train details...</p>
      </div>
    );
  }

  if (!train) {
    return (
      <div className="min-h-screen bg-background p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Train Not Found</h2>
              <p className="text-muted-foreground mb-4">The train with ID {trainId} could not be found.</p>
              <Button onClick={() => navigate("/")} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate("/")} 
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Train List
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary rounded-lg">
                <Train className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Train {train.train_id}</h1>
                <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{train.train_route}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <PriorityBadge priority={train.priority} />
              <StatusBadge status={train.status} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fault Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Fault Locations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {train.fault_locations.map((location, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-1 text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-foreground">{location}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Crack Descriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>Crack Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {train.crack_descriptions.map((description, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Badge variant="secondary" className="mt-1 text-xs min-w-fit">
                      {index + 1}
                    </Badge>
                    <span className="text-foreground text-sm">{description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Media - Images */}
          {train.media_links.images?.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span>Inspection Images</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {train.media_links.images.map((imageUrl, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Fault inspection ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media - Videos */}
          {train.media_links.videos?.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Inspection Videos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {train.media_links.videos.map((videoUrl, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-full"
                        preload="metadata"
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainDetailPage;
