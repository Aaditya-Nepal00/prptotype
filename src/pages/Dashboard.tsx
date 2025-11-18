import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  FileText,
  TrendingUp
} from "lucide-react"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const kpiData = [
  { label: "Ongoing Projects", value: "342", icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
  { label: "Completed Projects", value: "1,247", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950" },
  { label: "Delayed Projects", value: "89", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950" },
  { label: "Active Tenders", value: "156", icon: FileText, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950" },
]

const progressChartData = {
  labels: ["Health", "Education", "Infrastructure", "Agriculture", "Energy"],
  datasets: [{
    label: "Projects",
    data: [65, 78, 45, 32, 56],
    backgroundColor: [
      "rgba(30, 58, 138, 0.8)",
      "rgba(34, 197, 94, 0.8)",
      "rgba(251, 191, 36, 0.8)",
      "rgba(220, 38, 38, 0.8)",
      "rgba(147, 51, 234, 0.8)",
    ],
  }],
}

const trendChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{
    label: "Projects Completed",
    data: [120, 145, 138, 167, 189, 203],
    borderColor: "rgb(30, 58, 138)",
    backgroundColor: "rgba(30, 58, 138, 0.1)",
    tension: 0.4,
  }],
}

const statusChartData = {
  labels: ["Completed", "Ongoing", "Delayed", "Planning"],
  datasets: [{
    data: [45, 30, 15, 10],
    backgroundColor: [
      "rgba(34, 197, 94, 0.8)",
      "rgba(30, 58, 138, 0.8)",
      "rgba(251, 191, 36, 0.8)",
      "rgba(156, 163, 175, 0.8)",
    ],
  }],
}

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time transparency metrics and project insights
            </p>
          </div>
        </div>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${kpi.bg}`}>
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress by Sector</CardTitle>
              <CardDescription>Distribution across key sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={progressChartData} options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
              <CardDescription>Current project distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="w-64 h-64">
                <Doughnut data={statusChartData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Completion Trend</CardTitle>
            <CardDescription>Monthly completion rates over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <Line data={trendChartData} options={{
              responsive: true,
              plugins: { legend: { display: true } },
              scales: {
                y: { beginAtZero: true },
              },
            }} />
          </CardContent>
        </Card>

        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle>Projects by Region</CardTitle>
            <CardDescription>Geographic distribution of active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapContainer
                center={[28.3949, 84.1240]}
                zoom={7}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={[27.7172, 85.3240]}>
                  <Popup>
                    <div>
                      <strong>Kathmandu</strong><br />
                      <Badge variant="default">24 Projects</Badge>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={[27.4728, 87.2833]}>
                  <Popup>
                    <div>
                      <strong>Biratnagar</strong><br />
                      <Badge variant="default">18 Projects</Badge>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={[28.2719, 83.9718]}>
                  <Popup>
                    <div>
                      <strong>Pokhara</strong><br />
                      <Badge variant="default">15 Projects</Badge>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={[26.4525, 87.2718]}>
                  <Popup>
                    <div>
                      <strong>Janakpur</strong><br />
                      <Badge variant="default">12 Projects</Badge>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

