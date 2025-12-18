import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Eye, CheckCircle, TrendingUp } from "lucide-react"

export function Landing() {
  const stats = [
    { label: "Active Projects", value: "1,247", icon: TrendingUp },
    { label: "Citizens Engaged", value: "45,892", icon: CheckCircle },
    { label: "Reports Filed", value: "3,421", icon: Eye },
    { label: "Trust Score", value: "94%", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[90vh] md:min-h-screen flex items-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/bg.mp4"
        />

        {/* Dark Overlay Layer */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
              <div className="flex items-center justify-center">
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
              A Modern Transparency Platform
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-4 md:mb-6 drop-shadow-md">
              for Nepali Governance
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-10 drop-shadow-md px-4">
              Empowering citizens with real-time project tracking, budget transparency,
              and anonymous corruption reporting. Building trust through accountability.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E3A8A] hover:bg-blue-50 border-0 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base px-6 py-6 md:px-8 md:py-6"
              >
                <Link to="/projects">
                  Explore Projects <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1E3A8A] bg-transparent shadow-lg hover:shadow-xl transition-all text-sm sm:text-base px-6 py-6 md:px-8 md:py-6"
              >
                <Link to="/report">
                  Report Corruption
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1E3A8A] bg-transparent shadow-lg hover:shadow-xl transition-all text-sm sm:text-base px-6 py-6 md:px-8 md:py-6"
              >
                <Link to="/budget">
                  Track Budget
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Transparency at Every Level</h2>
          <p className="text-xl text-muted-foreground">
            Real-time tracking, secure reporting, and comprehensive insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Anonymous Reporting</h3>
              <p className="text-muted-foreground">
                Report corruption safely and securely. Your identity is protected.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6">
              <Eye className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor projects, budgets, and tenders with live updates and visualizations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="p-6">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accountability</h3>
              <p className="text-muted-foreground">
                Access simplified laws, budgets, and project documentation in one place.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Transparency Movement</h2>
          <p className="text-xl mb-8 text-blue-100">
            Together, we can build a more accountable and transparent Nepal
          </p>
          <Button asChild size="lg" className="bg-white text-[#1E3A8A] hover:bg-blue-50">
            <Link to="/dashboard">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

