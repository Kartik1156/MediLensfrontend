import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar({ isDark, onToggleTheme }) {
  const { copy, language, setLanguage } = useLanguage()

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 border-b border-slate-200/90 backdrop-blur-xl bg-white/85 dark:bg-slate-950/65 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-20 gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 6, scale: 1.03 }}
              className="relative grid place-items-center h-11 w-11 rounded-xl bg-white border border-medical-300/50 overflow-hidden"
            >
              <img
                src="/medilens-logo.svg"
                alt="MediLens logo"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 transition">
                MediLens
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-[0.14em] uppercase">Prescription clarity</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-cyan-400/60 transition"
            >
              <span className="text-sm" aria-hidden="true">{isDark ? '☀' : '☾'}</span>
              {isDark ? 'Light' : 'Dark'}
            </button>
            <Link
              to="/"
              className="hidden md:inline-flex text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition duration-300 text-sm px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {copy.nav.home}
            </Link>
            <Link
              to="/how-it-works"
              className="btn-secondary text-sm !px-4 !py-2 rounded-full"
            >
              {copy.nav.how}
            </Link>
            <Link
              to="/analyze"
              className="btn-primary text-sm !px-4 !py-2 rounded-full"
            >
              {copy.nav.scan}
            </Link>
            <div className="flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-full px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase transition ${
                  language === 'en'
                    ? 'bg-medical-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`rounded-full px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase transition ${
                  language === 'hi'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
