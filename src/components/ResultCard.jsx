import React, { useState } from 'react'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

export default function ResultCard({ result }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const sections = [
    {
      id: 'medicine',
      icon: '💊',
      title: 'Medicine',
      content: result.medicine,
      color: 'from-emerald-400 to-teal-400'
    },
    {
      id: 'dosage',
      icon: '📏',
      title: 'Dosage',
      content: result.dosage,
      color: 'from-amber-400 to-orange-400'
    },
    {
      id: 'purpose',
      icon: '🎯',
      title: 'Purpose',
      content: result.purpose,
      color: 'from-cyan-400 to-emerald-400'
    },
    {
      id: 'precautions',
      icon: '⚠️',
      title: 'Precautions',
      content: result.precautions,
      color: 'from-rose-400 to-orange-400'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Confidence Score */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="glass noise-overlay p-4 rounded-xl border border-emerald-200/25"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-300">Analysis Confidence</span>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
            {result.confidence || 95}%
          </span>
        </div>
        <div className="w-full bg-slate-900/70 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence || 95}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
          />
        </div>
      </motion.div>

      {/* Medicine Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className="glass noise-overlay p-4 rounded-xl border border-white/10 cursor-pointer hover:border-emerald-200/35 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {section.icon}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-sm text-slate-300">
                  {section.title}
                </h3>
                <p className="text-slate-100 text-sm line-clamp-2">
                  {section.content}
                </p>
              </div>
            </div>

            {/* Expanded view */}
            <motion.div
              initial={false}
              animate={{
                height: expandedSection === section.id ? 'auto' : 0,
                opacity: expandedSection === section.id ? 1 : 0,
                marginTop: expandedSection === section.id ? 12 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Full Explanation */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="glass noise-overlay p-6 rounded-xl border border-emerald-200/25"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>📖</span>
          Full Explanation
        </h3>
        <p className="text-slate-200 leading-relaxed text-sm">
          {result.fullExplanation}
        </p>
      </motion.div>
    </motion.div>
  )
}
