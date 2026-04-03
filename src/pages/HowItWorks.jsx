import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export default function HowItWorks() {
  const { copy } = useLanguage()

  return (
    <main className="relative pt-10 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass noise-overlay rounded-[2rem] p-8 md:p-10 border border-cyan-200/60 mb-14"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-700 mb-3">{copy.howItWorks.badge}</p>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4 leading-tight max-w-4xl text-slate-900">
            {copy.howItWorks.title}
          </h1>
          <p className="text-slate-600 text-lg max-w-4xl leading-relaxed">
            {copy.howItWorks.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-10 text-center">{copy.howItWorks.stepsHeading}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            {copy.howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass rounded-[1.75rem] p-7 border border-cyan-200/60 hover:border-cyan-300 transition-all min-h-[12rem]"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full w-12 h-12 flex items-center justify-center font-bold text-white flex-shrink-0 shadow-lg shadow-cyan-400/20">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-semibold pt-1 text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 mb-3 leading-relaxed">{step.description}</p>
                <p className="text-slate-500 text-sm border-t border-slate-200 pt-3">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-10 text-center">{copy.howItWorks.benefitsHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
            {copy.howItWorks.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass rounded-[1.5rem] p-6 border border-emerald-200/60"
              >
                <h4 className="text-lg font-semibold text-emerald-700 mb-2">{benefit.title}</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass noise-overlay rounded-[1.75rem] p-8 border border-amber-200/60 bg-gradient-to-r from-amber-100/60 to-white mb-12"
        >
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="text-2xl">⚕️</span> {copy.howItWorks.noticeTitle}
          </h3>
          <p className="text-slate-600 leading-relaxed">{copy.howItWorks.noticeBody}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/analyze">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              {copy.howItWorks.cta}
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
