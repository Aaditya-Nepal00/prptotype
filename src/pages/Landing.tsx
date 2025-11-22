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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h50v50H0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Nepal Map Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96 group">
            <div className="absolute inset-0 rounded-full bg-white/20 blur-3xl animate-glow group-hover:animate-none"></div>
            <div className="absolute inset-8 rounded-full bg-white/10 blur-2xl animate-glow group-hover:animate-none" style={{ animationDelay: '1s' }}></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
              {/* Simplified Nepal Shape */}
              <path d="M200 50 L250 80 L280 120 L290 180 L280 240 L250 280 L200 300 L150 280 L120 240 L110 180 L120 120 L150 80 Z" 
                    stroke="white" strokeWidth="3" fill="rgba(255,255,255,0.1)" className="animate-pulse group-hover:animate-none" />
            </svg>
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex flex-col items-center justify-center w-full -mt-8 md:-mt-12">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/logoFolder/logo.png" 
                  alt="Sachet Logo" 
                  className="h-32 w-32 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain drop-shadow-2xl mx-auto"
                />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-light text-blue-100">
              A Modern Transparency Platform for Nepali Governance
            </p>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
              Empowering citizens with real-time project tracking, budget transparency, 
              and anonymous corruption reporting. Building trust through accountability.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Button asChild size="lg" className="bg-white text-[#1E3A8A] hover:bg-blue-50 border-0">
                <Link to="/projects">
                  Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1E3A8A] bg-transparent">
                <Link to="/report">
                  Report Corruption
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1E3A8A] bg-transparent">
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

