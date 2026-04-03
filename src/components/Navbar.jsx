import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 border-b border-blue-400/20 backdrop-blur-xl bg-slate-950/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.06 }}
              className="relative grid place-items-center text-xl h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/40"
            >
              <span className="text-sm font-bold tracking-wide text-blue-100">ML</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent transition">
                MediLens
              </span>
              <span className="text-xs text-blue-300/60 font-medium">Prescription Intelligence</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="text-slate-300 hover:text-white transition duration-300 text-sm hidden sm:inline"
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className="btn-secondary text-sm !px-4 !py-2"
            >
              How It Works
            </Link>
            <Link
              to="/analyze"
              className="btn-primary text-sm !px-4 !py-2"
            >
              Start Scan
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
