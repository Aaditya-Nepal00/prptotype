import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { Shield, CheckCircle2, Upload, MapPin, FileText } from "lucide-react"

function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

const categories = [
  "Bribery",
  "Embezzlement",
  "Nepotism",
  "Abuse of Power",
  "Contract Manipulation",
  "Misuse of Funds",
  "Other",
]

const steps = [
  { number: 1, title: "Incident Details", description: "Describe what happened" },
  { number: 2, title: "Location", description: "Where did this occur?" },
  { number: 3, title: "Evidence", description: "Upload supporting documents" },
  { number: 4, title: "Review", description: "Confirm and submit" },
]

export function ReportCorruption() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: { lat: 27.7172, lng: 85.3240 },
    files: [] as File[],
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setCurrentStep(1)
      setFormData({
        category: "",
        description: "",
        location: { lat: 27.7172, lng: 85.3240 },
        files: [],
      })
    }, 5000)
  }

  const progress = (currentStep / steps.length) * 100

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full border-2 border-green-500">
          <CardContent className="p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-6">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
              Report Submitted Successfully
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Your identity is protected. Your report has been submitted securely.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5" />
              <span>All information is encrypted and anonymous</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Anonymous Corruption Reporting</h1>
          <p className="text-muted-foreground">
            Report corruption safely and securely. Your identity is protected.
          </p>
        </div>

        {/* Progress Stepper */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <div className="mt-2 text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step) => {
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number
                return (
                  <div
                    key={step.number}
                    className={`text-center p-4 rounded-lg transition-all ${
                      isActive ? "bg-primary text-primary-foreground" :
                      isCompleted ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" :
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className={`text-2xl font-bold mb-2 ${isCompleted ? "line-through" : ""}`}>
                      {step.number}
                    </div>
                    <div className="text-xs font-medium">{step.title}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Provide detailed information about the incident..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    Your report is completely anonymous. No personal information is required or collected.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location (Click on map to select)
                  </label>
                  <div className="h-[400px] rounded-lg overflow-hidden border">
                    <MapContainer
                      center={[formData.location.lat, formData.location.lng]}
                      zoom={10}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      />
                      <LocationPicker onLocationSelect={(lat, lng) => setFormData({ ...formData, location: { lat, lng } })} />
                      <Marker position={[formData.location.lat, formData.location.lng]} />
                    </MapContainer>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Selected: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Evidence (Optional)
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, Images, Documents (Max 10MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setFormData({ ...formData, files: [...formData.files, ...files] })
                      }}
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newFiles = formData.files.filter((_, i) => i !== index)
                              setFormData({ ...formData, files: newFiles })
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-4">Review Your Report</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Category:</span>{" "}
                      <Badge>{formData.category || "Not selected"}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="mt-1 text-muted-foreground">{formData.description || "None"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                    </div>
                    <div>
                      <span className="font-medium">Files:</span> {formData.files.length} file(s)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <p className="text-sm text-green-900 dark:text-green-100">
                    Your report is ready to submit. All information is encrypted and your identity remains protected.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={currentStep === 1 && (!formData.category || !formData.description)}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Submit Report
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

