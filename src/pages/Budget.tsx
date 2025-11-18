import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Doughnut, Bar, Line } from "react-chartjs-2"
import { Download, FileText, TrendingUp } from "lucide-react"

const sectorData = {
  labels: ["Health", "Education", "Infrastructure", "Agriculture", "Energy", "Defense", "Others"],
  datasets: [{
    data: [18, 22, 25, 12, 10, 8, 5],
    backgroundColor: [
      "rgba(220, 38, 38, 0.8)",
      "rgba(30, 58, 138, 0.8)",
      "rgba(34, 197, 94, 0.8)",
      "rgba(251, 191, 36, 0.8)",
      "rgba(147, 51, 234, 0.8)",
      "rgba(156, 163, 175, 0.8)",
      "rgba(236, 72, 153, 0.8)",
    ],
  }],
}

const departmentData = {
  labels: ["Ministry of Health", "Ministry of Education", "Ministry of Infrastructure", "Ministry of Agriculture", "Ministry of Energy"],
  datasets: [{
    label: "Allocated (Rs. Billions)",
    data: [45, 55, 62, 30, 25],
    backgroundColor: "rgba(30, 58, 138, 0.8)",
  }, {
    label: "Spent (Rs. Billions)",
    data: [38, 48, 52, 24, 20],
    backgroundColor: "rgba(220, 38, 38, 0.8)",
  }],
}

const yearlyComparisonData = {
  labels: ["2020", "2021", "2022", "2023", "2024"],
  datasets: [{
    label: "Total Budget (Rs. Billions)",
    data: [1200, 1350, 1450, 1600, 1750],
    borderColor: "rgb(30, 58, 138)",
    backgroundColor: "rgba(30, 58, 138, 0.1)",
    tension: 0.4,
  }],
}

const allocationUsageData = [
  { department: "Health", allocated: 45, used: 38, percentage: 84 },
  { department: "Education", allocated: 55, used: 48, percentage: 87 },
  { department: "Infrastructure", allocated: 62, used: 52, percentage: 84 },
  { department: "Agriculture", allocated: 30, used: 24, percentage: 80 },
  { department: "Energy", allocated: 25, used: 20, percentage: 80 },
]

export function Budget() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Budget Transparency</h1>
            <p className="text-muted-foreground">
              Comprehensive budget allocation and spending visualization
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rs. 1,750B</div>
              <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +9.4% from last year
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Amount Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rs. 1,182B</div>
              <div className="text-sm text-muted-foreground mt-1">67.5% of budget</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Remaining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rs. 568B</div>
              <div className="text-sm text-muted-foreground mt-1">32.5% of budget</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">83%</div>
              <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                Above average
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sector-wise Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector-wise Budget Distribution</CardTitle>
              <CardDescription>Allocation across key sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <Doughnut data={sectorData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "right" },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const label = context.label || ""
                          const value = context.parsed || 0
                          return `${label}: ${value}% (Rs. ${(value / 100 * 1750).toFixed(1)}B)`
                        },
                      },
                    },
                  },
                }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department-wise Spending</CardTitle>
              <CardDescription>Allocation vs Actual Spending</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={departmentData} options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                },
                scales: {
                  x: { stacked: false },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `Rs. ${value}B`,
                    },
                  },
                },
              }} />
            </CardContent>
          </Card>
        </div>

        {/* Yearly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Year-to-Year Budget Comparison</CardTitle>
            <CardDescription>Budget trends over the past 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <Line data={yearlyComparisonData} options={{
              responsive: true,
              plugins: {
                legend: { display: true },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      return `Rs. ${context.parsed.y}B`
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `Rs. ${value}B`,
                  },
                },
              },
            }} />
          </CardContent>
        </Card>

        {/* Allocation vs Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Allocation vs Usage</CardTitle>
            <CardDescription>Department-wise budget utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {allocationUsageData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.department}</span>
                    <span className="text-muted-foreground">
                      Rs. {item.used}B / Rs. {item.allocated}B ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        item.percentage >= 85 ? "bg-green-500" :
                        item.percentage >= 70 ? "bg-blue-500" :
                        "bg-yellow-500"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fund Flow Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>National-to-Local Fund Flow</CardTitle>
            <CardDescription>Budget distribution from federal to local levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-8 py-8">
              {/* Federal Level */}
              <div className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold">
                Federal Budget: Rs. 1,750B
              </div>
              
              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="border-l-2 border-primary h-12"></div>
                <div className="border-t-8 border-t-primary border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
              </div>

              {/* Provincial Level */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium">
                  Province 1<br />Rs. 245B
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium">
                  Province 2<br />Rs. 210B
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium">
                  Bagmati<br />Rs. 385B
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium">
                  Gandaki<br />Rs. 175B
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium">
                  Lumbini<br />Rs. 280B
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium">
                  Karnali<br />Rs. 210B
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium col-span-3">
                  Sudurpashchim<br />Rs. 245B
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="border-l-2 border-blue-600 h-12"></div>
                <div className="border-t-8 border-t-blue-600 border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
              </div>

              {/* Local Level */}
              <div className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold">
                Local Municipalities: Rs. 1,050B (60%)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

