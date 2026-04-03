import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function ResultCard({ result }) {
  const { copy } = useLanguage()
  const [expandedSection, setExpandedSection] = useState(null)

  const sections = [
    {
      id: 'medicine',
      icon: '💊',
      title: copy.analyze.resultFields.medicine,
      content: result.medicine,
    },
    {
      id: 'dosage',
      icon: '📏',
      title: copy.analyze.resultFields.dosage,
      content: result.dosage,
    },
    {
      id: 'purpose',
      icon: '🎯',
      title: copy.analyze.resultFields.purpose,
      content: result.purpose,
    },
    {
      id: 'precautions',
      icon: '⚠️',
      title: copy.analyze.resultFields.precautions,
      content: result.precautions,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="glass noise-overlay p-4 rounded-2xl border border-emerald-200/60"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-600">{copy.analyze.resultFields.confidence}</span>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {result.confidence || 95}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence || 95}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.08 }}
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className="glass noise-overlay p-4 rounded-2xl border border-slate-200 cursor-pointer hover:border-emerald-300 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">{section.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-sm text-slate-700">{section.title}</h3>
                <p className="text-slate-800 text-sm line-clamp-2">{section.content}</p>
              </div>
            </div>

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
              <div className="pt-3 border-t border-slate-200">
                <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="glass noise-overlay p-6 rounded-2xl border border-emerald-200/60"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>📖</span>
          {copy.analyze.resultFields.fullExplanation}
        </h3>
        <p className="text-slate-700 leading-relaxed text-sm">{result.fullExplanation}</p>
      </motion.div>
    </motion.div>
  )
}
