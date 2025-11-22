import { Link, useLocation } from "react-router-dom"
import { 
  Home,
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  DollarSign, 
  BookOpen, 
  AlertTriangle, 
  Newspaper, 
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: FileText, label: "Tenders", path: "/tenders" },
  { icon: DollarSign, label: "Budget", path: "/budget" },
  { icon: BookOpen, label: "Laws", path: "/laws" },
  { icon: AlertTriangle, label: "Report Corruption", path: "/report" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: User, label: "Account", path: "/account" },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-all hidden md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/logoFolder/logo.png" alt="Sachet Logo" className="h-16 w-16 object-contain" />
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:scale-105 hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

