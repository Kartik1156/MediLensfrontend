import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import HowItWorks from './pages/HowItWorks'

export default function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const initialTheme = savedTheme || 'dark'
    setIsDark(initialTheme === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <Router>
      <div className="min-h-screen text-slate-800 bg-transparent">
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-28 -left-24 h-[24rem] w-[24rem] rounded-full bg-medical-300/28 blur-3xl dark:bg-cyan-500/18" />
          <div className="absolute top-1/4 -right-20 h-[20rem] w-[20rem] rounded-full bg-health-300/22 blur-3xl dark:bg-emerald-500/14" />
          <div className="absolute bottom-[-5rem] left-1/4 h-[18rem] w-[18rem] rounded-full bg-cyan-200/28 blur-3xl dark:bg-indigo-500/14" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.2),transparent_62%)]" />
        </div>

        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </div>
    </Router>
  )
}
