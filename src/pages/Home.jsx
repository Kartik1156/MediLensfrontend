import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export default function Home() {
  const heroLine = 'From confusing prescriptions to clear understanding'
  const [typedHeroLine, setTypedHeroLine] = useState('')

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTypedHeroLine(heroLine.slice(0, index))
      if (index >= heroLine.length) {
        clearInterval(timer)
      }
    }, 36)

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: '📋',
      title: 'OCR & Medicine Recognition',
      description: 'Accurately extract medicine names, dosages, and frequencies from handwritten and printed prescriptions using advanced OCR technology.',
    },
    {
      icon: '🎯',
      title: 'Structured Data Output',
      description: 'Get organized summaries including medicine purpose, side effects, contraindications, and patient safety warnings.',
    },
    {
      icon: '🔊',
      title: 'Multilingual Voice Support',
      description: 'Audio playback in English and Hindi helps non-literate and elderly patients understand medications clearly.',
    },
  ]

  const useCases = [
    {
      category: 'For Healthcare Providers',
      items: ['Reduce patient medication confusion', 'Improve adherence documentation', 'Faster prescription interpretation']
    },
    {
      category: 'For Patients & Caregivers',
      items: ['Understand complex prescriptions', 'Access 24/7 medication reminders', 'Reduce pharmacy visits for clarifications']
    },
    {
      category: 'For Clinics & Hospitals',
      items: ['Streamline patient onboarding', 'Reduce medication errors', 'Better patient outcomes tracking']
    }
  ]

  return (
    <main className="relative pt-14 pb-20">
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300/40 bg-blue-500/10 text-blue-100 text-sm font-semibold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-blue-300 animate-pulse" />
                FDA-Grade Prescription Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                {typedHeroLine}
                <span className="text-cyan-200 animate-pulse">|</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-200 mb-4 max-w-2xl leading-relaxed font-medium"
            >
              MediLens transforms prescription photos into clean, understandable medication guidance with timing, purpose, precautions, and voice playback.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-slate-400 mb-8 max-w-2xl leading-relaxed"
            >
              Trusted by clinics across India. Helps reduce medication confusion, improve patient compliance, and enhance healthcare communication—all in seconds.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              <Link to="/analyze" className="group relative inline-block">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-primary text-base md:text-lg">
                  Start Prescription Scan
                  <span className="ml-2">→</span>
                </motion.div>
              </Link>
              <Link to="/how-it-works" className="group relative inline-block">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-secondary text-base md:text-lg">
                  How It Works
                </motion.div>
              </Link>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-slate-400 max-w-lg">
              Designed to reduce prescription confusion and make medication guidance easier for every patient.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="glass gradient-stroke noise-overlay rounded-3xl p-7">
              <div className="relative rounded-2xl p-6 bg-slate-950/60 border border-white/10 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-emerald-300/20 blur-2xl" />
                <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-amber-300/20 blur-2xl" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="mx-auto mb-6 w-44 h-44 rounded-full border border-dashed border-emerald-200/40 grid place-items-center"
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-300/25 to-teal-300/25 border border-emerald-200/30 grid place-items-center text-5xl">
                    🧾
                  </div>
                </motion.div>

                <div className="space-y-3">
                  {['Extract OCR', 'Match medicine names', 'Explain in plain language'].map((line, idx) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.2 + idx * 0.15 }}
                      className="rounded-xl bg-slate-900/65 border border-white/10 p-3 flex items-center justify-between"
                    >
                      <span className="text-sm text-slate-200">{line}</span>
                      <span className="text-emerald-300">✓</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Core Capabilities
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-center text-slate-400 mb-12 max-w-2xl mx-auto"
        >
          Advanced features designed for accurate prescription interpretation and patient safety
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="glass noise-overlay p-8 rounded-2xl border border-blue-200/15 transition-all duration-300 hover:border-blue-200/40"
            >
              <motion.div 
                className="text-5xl mb-4"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Who Benefits from MediLens?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass rounded-2xl p-8 border border-cyan-200/20 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold mb-5 text-cyan-100">{useCase.category}</h3>
              <ul className="space-y-3">
                {useCase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold text-xl leading-none mt-0.5">✓</span>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trust & Compliance Section */}
      <motion.section 
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="glass noise-overlay rounded-3xl p-12 border border-emerald-200/20">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            Built for Healthcare Trust
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-emerald-100 mb-3">Patient Data Security</h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                All prescriptions are processed securely with end-to-end encryption. Your patient data remains private and compliant with healthcare regulations.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-emerald-100 mb-3">Clinical Accuracy</h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                MediLens uses medical-grade OCR and AI trained on thousands of prescriptions to ensure accuracy and reduce medication errors.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-emerald-100 mb-3">Multilingual Support</h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                Currently supports English and Hindi with voice playback, making healthcare accessible across language barriers.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-emerald-100 mb-3">No Rx Replacement</h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                MediLens is a communication aid, not a replacement for medical professionals. Always consult your doctor or pharmacist.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="glass noise-overlay p-12 rounded-3xl border border-blue-200/30">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify prescription handoffs?</h2>
          <p className="text-slate-300 mb-8">Experience accurate prescription interpretation in seconds. Free to use. No registration required.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/analyze">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Open Scanner
              </motion.button>
            </Link>
            <Link to="/how-it-works">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg"
              >
                How It Works
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          <div>
            <h4 className="font-bold text-lg mb-4 text-blue-100">About MediLens</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              MediLens is a prescription intelligence platform designed to make medication guidance clear and accessible for patients, caregivers, and healthcare providers across India.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-blue-100">Key Features</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>✓ Medical-grade OCR</li>
              <li>✓ Voice playback (English & Hindi)</li>
              <li>✓ Patient-friendly summaries</li>
              <li>✓ Secure & private</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-blue-100">Disclaimer</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              MediLens is a communication aid only. Not a medical device. Always consult your healthcare provider before making medication decisions.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-slate-500 text-sm">
          <p>&copy; 2024 MediLens. All rights reserved. Designed for healthcare clarity.</p>
        </div>
      </motion.footer>
    </main>
  )
}
