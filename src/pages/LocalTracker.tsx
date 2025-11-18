import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet"
import { MessageSquare, Camera, Flag, Clock, Users, MapPin } from "lucide-react"

const municipalities = [
  {
    id: 1,
    name: "Kathmandu Metropolitan City",
    location: [27.7172, 85.3240],
    projects: [
      { id: 1, name: "Street Lighting Project", progress: 85, status: "ongoing", comments: 23, photos: 12 },
      { id: 2, name: "Waste Management Initiative", progress: 60, status: "ongoing", comments: 45, photos: 8 },
    ],
  },
  {
    id: 2,
    name: "Pokhara Metropolitan City",
    location: [28.2719, 83.9718],
    projects: [
      { id: 3, name: "Lake Conservation Project", progress: 90, status: "ongoing", comments: 67, photos: 34 },
      { id: 4, name: "Tourism Infrastructure", progress: 45, status: "ongoing", comments: 28, photos: 15 },
    ],
  },
  {
    id: 3,
    name: "Lalitpur Metropolitan City",
    location: [27.6710, 85.3250],
    projects: [
      { id: 5, name: "Heritage Site Restoration", progress: 70, status: "ongoing", comments: 89, photos: 42 },
    ],
  },
]

const activities = [
  { id: 1, type: "comment", user: "Citizen123", project: "Street Lighting Project", time: "2 hours ago", content: "Great progress! Keep it up." },
  { id: 2, type: "photo", user: "LocalResident", project: "Waste Management Initiative", time: "5 hours ago", content: "Uploaded 3 photos" },
  { id: 3, type: "flag", user: "CommunityRep", project: "Heritage Site Restoration", time: "1 day ago", content: "Flagged a safety concern" },
  { id: 4, type: "update", user: "Municipality", project: "Lake Conservation Project", time: "2 days ago", content: "Phase 2 completed successfully" },
]

export function LocalTracker() {
  const [selectedMunicipality, setSelectedMunicipality] = useState<typeof municipalities[0] | null>(null)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Local Development Tracker</h1>
          <p className="text-muted-foreground">
            Community-driven tracking of municipal projects and development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Municipalities & Projects</CardTitle>
                <CardDescription>Interactive map of local projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <MapContainer
                    center={[28.3949, 84.1240]}
                    zoom={7}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    {municipalities.map((municipality) => (
                      <CircleMarker
                        key={municipality.id}
                        center={municipality.location}
                        radius={15}
                        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.6 }}
                        eventHandlers={{
                          click: () => setSelectedMunicipality(municipality),
                        }}
                      >
                        <Popup>
                          <div>
                            <strong>{municipality.name}</strong><br />
                            <Badge>{municipality.projects.length} Projects</Badge>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Municipality Projects List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Municipalities</h2>
            {municipalities.map((municipality) => (
              <Card
                key={municipality.id}
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedMunicipality?.id === municipality.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedMunicipality(municipality)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{municipality.name}</CardTitle>
                  <CardDescription>
                    {municipality.projects.length} active project{municipality.projects.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {municipality.location[0].toFixed(4)}, {municipality.location[1].toFixed(4)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Municipality Projects */}
        {selectedMunicipality && (
          <Card>
            <CardHeader>
              <CardTitle>Projects in {selectedMunicipality.name}</CardTitle>
              <CardDescription>Community engagement and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedMunicipality.projects.map((project) => (
                  <Card key={project.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant={project.status === "ongoing" ? "default" : "success"}>
                              {project.status}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MessageSquare className="h-4 w-4" />
                              {project.comments} comments
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Camera className="h-4 w-4" />
                              {project.photos} photos
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{project.progress}% Complete</span>
                          <span>Expected completion: Q2 2024</span>
                        </div>

                        {/* Community Comments */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Recent Community Comments
                          </h4>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {[1, 2].map((i) => (
                              <div key={i} className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">Citizen{Math.floor(Math.random() * 1000)}</span>
                                  <span className="text-xs text-muted-foreground">• 2 days ago</span>
                                </div>
                                <p className="text-sm">Great to see progress on this project!</p>
                              </div>
                            ))}
                          </div>
                          <Input placeholder="Add a comment..." className="w-full" />
                        </div>

                        {/* Photo Gallery */}
                        <div className="mt-4">
                          <h4 className="font-semibold flex items-center gap-2 mb-3">
                            <Camera className="h-4 w-4" />
                            Community Photos
                          </h4>
                          <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className="aspect-square bg-muted rounded flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                              >
                                <Camera className="h-8 w-8 text-muted-foreground" />
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="mt-2 w-full">
                            <Camera className="h-4 w-4 mr-2" />
                            Upload Photo/Video
                          </Button>
                        </div>

                        {/* Issue Flagging */}
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" className="w-full">
                            <Flag className="h-4 w-4 mr-2" />
                            Flag an Issue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Recent community engagement across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="mt-1">
                    {activity.type === "comment" && <MessageSquare className="h-5 w-5 text-blue-500" />}
                    {activity.type === "photo" && <Camera className="h-5 w-5 text-green-500" />}
                    {activity.type === "flag" && <Flag className="h-5 w-5 text-red-500" />}
                    {activity.type === "update" && <Clock className="h-5 w-5 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-sm text-muted-foreground">on {activity.project}</span>
                      <span className="text-xs text-muted-foreground">• {activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

