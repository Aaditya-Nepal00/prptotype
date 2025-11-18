import { Link, useLocation } from "react-router-dom"
import { 
  Home,
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  DollarSign, 
  BookOpen, 
  AlertTriangle, 
  MapPin, 
  Newspaper, 
  User,
  Moon,
  Sun
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: FileText, label: "Tenders", path: "/tenders" },
  { icon: DollarSign, label: "Budget", path: "/budget" },
  { icon: BookOpen, label: "Laws", path: "/laws" },
  { icon: AlertTriangle, label: "Report Corruption", path: "/report" },
  { icon: MapPin, label: "Local Tracker", path: "/local-tracker" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: User, label: "Account", path: "/account" },
]

export function Sidebar() {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  useEffect(() => {
    // Sync state with DOM on mount
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (typeof window !== "undefined") {
      if (newIsDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-all hidden md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer">
            Sachet
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </aside>
  )
}

