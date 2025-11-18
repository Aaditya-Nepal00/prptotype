import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Sparkles, CheckCircle2, XCircle, Filter, Settings } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Government Announces New Transparency Measures",
    summary: "The Ministry of Finance has introduced new measures to increase budget transparency and citizen engagement in fiscal planning.",
    summaryNepali: "अर्थ मन्त्रालयले बजेट पारदर्शिता बढाउन र नागरिकहरूको संलग्नतामा वृद्धि गर्न नयाँ उपायहरू सुरु गरेको छ।",
    category: "Policy",
    date: "2024-03-15",
    factCheck: "verified",
    language: "en" as const,
    aiSummary: "New transparency measures focus on real-time budget tracking, mandatory project disclosure, and enhanced citizen reporting mechanisms.",
  },
  {
    id: 2,
    title: "Major Infrastructure Projects Complete Ahead of Schedule",
    summary: "Three major infrastructure projects in Kathmandu Valley have been completed ahead of schedule, improving connectivity for over 500,000 residents.",
    summaryNepali: "काठमाडौं उपत्यकामा तीन वृहत बुनियादी परियोजनाहरू समय अगाडि पूरा भएका छन्, जसले ५ लाख भन्दा बढी निवासीहरूको जडानतालाई सुधार गरेको छ।",
    category: "Infrastructure",
    date: "2024-03-14",
    factCheck: "verified",
    language: "en" as const,
    aiSummary: "Projects include road expansions, bridge construction, and public transport improvements. All projects were completed within budget and ahead of deadlines.",
  },
  {
    id: 3,
    title: "Anti-Corruption Initiative Shows Positive Results",
    summary: "The latest quarterly report shows a 23% increase in corruption reports, indicating greater citizen engagement and trust in the reporting system.",
    summaryNepali: "नवीनतम त्रैमासिक प्रतिवेदनले भ्रष्टाचार प्रतिवेदनहरूमा २३% वृद्धि देखाएको छ, जुन नागरिक संलग्नता र प्रतिवेदन प्रणालीमा विश्वास बढेको संकेत गर्दछ।",
    category: "Anti-Corruption",
    date: "2024-03-13",
    factCheck: "pending",
    language: "en" as const,
    aiSummary: "Increased reporting suggests improved platform accessibility and citizen confidence. Government response rate has improved to 78%.",
  },
  {
    id: 4,
    title: "Budget Allocation for Health Sector Increases",
    summary: "The fiscal year 2024-25 budget allocates 22% of total budget to health, up from 18% in the previous year, focusing on rural health infrastructure.",
    summaryNepali: "आर्थिक वर्ष २०२४-२५ को बजेटले कुल बजेटको २२% स्वास्थ्यमा आवंटन गरेको छ, जुन अघिल्लो वर्षको १८% भन्दा बढी छ, ग्रामीण स्वास्थ्य बुनियादमा ध्यान दिँदै।",
    category: "Budget",
    date: "2024-03-12",
    factCheck: "verified",
    language: "en" as const,
    aiSummary: "Focus areas include rural health centers, telemedicine infrastructure, and vaccination programs. Increased allocation addresses critical gaps in healthcare access.",
  },
]

const categories = ["All", "Policy", "Infrastructure", "Budget", "Anti-Corruption", "Health", "Education"]

export function News() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [language, setLanguage] = useState<"en" | "ne">("en")
  const [showPersonalization, setShowPersonalization] = useState(false)

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch = language === "en"
      ? article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      : article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.summaryNepali.includes(searchTerm)
    const matchesCategory = categoryFilter === "All" || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Smart News Portal</h1>
            <p className="text-muted-foreground">
              Curated governance news with AI-powered summaries
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={language === "en" ? "default" : "outline"}
              onClick={() => setLanguage("en")}
              size="sm"
            >
              English
            </Button>
            <Button
              variant={language === "ne" ? "default" : "outline"}
              onClick={() => setLanguage("ne")}
              size="sm"
            >
              नेपाली
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPersonalization(!showPersonalization)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Personalize
            </Button>
          </div>
        </div>

        {/* Personalization Panel */}
        {showPersonalization && (
          <Card>
            <CardHeader>
              <CardTitle>Personalization Settings</CardTitle>
              <CardDescription>Customize your news feed preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Preferred Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(c => c !== "All").map((cat) => (
                      <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notification Preferences</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Breaking news
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Policy updates
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Project completions
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === "en" ? "Search news..." : "समाचार खोज्नुहोस्..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* News Feed */}
        <div className="space-y-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge>{article.category}</Badge>
                      {article.factCheck === "verified" && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {article.factCheck === "pending" && (
                        <Badge variant="warning" className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl mb-2">{article.title}</CardTitle>
                    <CardDescription className="text-base">
                      {language === "en" ? article.summary : article.summaryNepali}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* AI Summary Card */}
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1 flex items-center gap-2">
                            AI Summary
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {article.aiSummary}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                    <span>{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <Button variant="ghost" size="sm">
                      Read Full Article →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <Button variant="outline">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}

