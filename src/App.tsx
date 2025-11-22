import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Landing } from "@/pages/Landing"
import { Dashboard } from "@/pages/Dashboard"
import { Projects } from "@/pages/Projects"
import { Tenders } from "@/pages/Tenders"
import { Budget } from "@/pages/Budget"
import { Laws } from "@/pages/Laws"
import { ReportCorruption } from "@/pages/ReportCorruption"
import { News } from "@/pages/News"
import { Account } from "@/pages/Account"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tenders" element={<Tenders />} />
          <Route path="budget" element={<Budget />} />
          <Route path="laws" element={<Laws />} />
          <Route path="report" element={<ReportCorruption />} />
          <Route path="news" element={<News />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

