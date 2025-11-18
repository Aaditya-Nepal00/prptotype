import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bar } from "react-chartjs-2"
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet"
import type { LatLngTuple } from "leaflet"
import { Filter, Search, Eye, Calendar, DollarSign, MapPin } from "lucide-react"

type ProjectStatus = "ongoing" | "completed" | "delayed" | "inactive"

const projects: Array<{
  id: number
  name: string
  status: ProjectStatus
  progress: number
  budget: string
  location: LatLngTuple
  sector: string
  contractor: string
  startDate: string
  endDate: string
}> = [
  {
    id: 1,
    name: "Kathmandu-Bhaktapur Road Expansion",
    status: "ongoing",
    progress: 65,
    budget: "Rs. 2.5B",
    location: [27.7172, 85.3240] as LatLngTuple,
    sector: "Infrastructure",
    contractor: "ABC Construction",
    startDate: "2023-01-15",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Bagmati River Cleanup Project",
    status: "ongoing",
    progress: 45,
    budget: "Rs. 1.8B",
    location: [27.7172, 85.3240] as LatLngTuple,
    sector: "Environment",
    contractor: "Green Nepal Ltd",
    startDate: "2023-03-01",
    endDate: "2025-06-30",
  },
  {
    id: 3,
    name: "Pokhara International Airport Terminal",
    status: "completed",
    progress: 100,
    budget: "Rs. 5.2B",
    location: [28.2719, 83.9718] as LatLngTuple,
    sector: "Infrastructure",
    contractor: "Nepal Airlines",
    startDate: "2022-01-01",
    endDate: "2023-12-31",
  },
  {
    id: 4,
    name: "Rural Health Centers - Province 2",
    status: "delayed",
    progress: 32,
    budget: "Rs. 890M",
    location: [26.4525, 87.2718] as LatLngTuple,
    sector: "Health",
    contractor: "Health Ministry",
    startDate: "2023-05-01",
    endDate: "2024-08-31",
  },
  {
    id: 5,
    name: "Solar Power Plant - Mustang",
    status: "ongoing",
    progress: 78,
    budget: "Rs. 3.1B",
    location: [28.7922, 83.8770] as LatLngTuple,
    sector: "Energy",
    contractor: "NEA Solar",
    startDate: "2023-02-15",
    endDate: "2024-11-30",
  },
]

const statusColors: Record<ProjectStatus, "default" | "success" | "warning" | "secondary"> = {
  ongoing: "default",
  completed: "success",
  delayed: "warning",
  inactive: "secondary",
}

export function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const projectChartData = {
    labels: filteredProjects.map((p) => p.name.split(" ")[0]),
    datasets: [{
      label: "Progress %",
      data: filteredProjects.map((p) => p.progress),
      backgroundColor: "rgba(30, 58, 138, 0.8)",
    }],
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Project & Tender Tracking</h1>
          <p className="text-muted-foreground">
            Real-time tracking of government projects and tenders
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Map and List View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Locations</CardTitle>
                <CardDescription>Geographic distribution of projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <MapContainer
                    center={[28.3949, 84.1240]}
                    zoom={7}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    {filteredProjects.map((project) => {
                      const color = project.status === "completed" ? "green" : 
                                   project.status === "delayed" ? "red" : "blue"
                      return (
                        <CircleMarker
                          key={project.id}
                          center={project.location}
                          radius={10}
                          pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
                        >
                          <Popup>
                            <div>
                              <strong>{project.name}</strong><br />
                              <Badge variant={statusColors[project.status]}>{project.status}</Badge><br />
                              Progress: {project.progress}%
                            </div>
                          </Popup>
                        </CircleMarker>
                      )
                    })}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Project List ({filteredProjects.length})</h2>
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedProject(project)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                  </div>
                  <CardDescription>{project.sector}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {project.location[0].toFixed(2)}, {project.location[1].toFixed(2)}
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.progress}% Complete</span>
                      <span>{project.budget}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress Overview</CardTitle>
            <CardDescription>Visual comparison of project completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={projectChartData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, max: 100 },
              },
            }} />
          </CardContent>
        </Card>

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedProject.name}</DialogTitle>
                <DialogDescription>
                  Detailed project information and progress tracking
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge variant={statusColors[selectedProject.status]}>{selectedProject.status}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Progress</label>
                    <div className="mt-1">
                      <Progress value={selectedProject.progress} />
                      <span className="text-sm">{selectedProject.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Budget</label>
                    <div className="mt-1 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {selectedProject.budget}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Sector</label>
                    <div className="mt-1">{selectedProject.sector}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contractor</label>
                    <div className="mt-1">{selectedProject.contractor}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Timeline</label>
                    <div className="mt-1 flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedProject.startDate} - {selectedProject.endDate}
                    </div>
                  </div>
                </div>

                {/* Budget Breakdown Placeholder */}
                <div>
                  <h3 className="font-semibold mb-2">Budget Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>Labor</span>
                      <span>40%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>Materials</span>
                      <span>35%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>Equipment</span>
                      <span>15%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>Administrative</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                {/* Photos Placeholder */}
                <div>
                  <h3 className="font-semibold mb-2">Project Photos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square bg-muted rounded flex items-center justify-center">
                        <Eye className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

