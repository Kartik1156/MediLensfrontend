import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const steps = [
  {
    id: '01',
    title: 'Upload a Prescription',
    description:
      'From the scanner page, upload a clear prescription image. MediLens accepts JPG, PNG, and PDF formats and automatically enhances image quality for optimal OCR.',
    detail: 'Works with handwritten, typed, and mixed-format prescriptions from any clinic or hospital.'
  },
  {
    id: '02',
    title: 'OCR & Text Extraction',
    description:
      'The system uses medical-grade optical character recognition to read prescription text, identifying medicine names, dosages, and frequencies with high accuracy.',
    detail: 'Handles multiple languages and medical abbreviations commonly found in Indian prescriptions.'
  },
  {
    id: '03',
    title: 'Data Structuring & Validation',
    description:
      'MediLens maps extracted text to a structured format with medicine purpose, precautions, side effects, and drug interactions.',
    detail: 'Cross-references with medical databases to ensure clarity and patient safety.'
  },
  {
    id: '04',
    title: 'Patient-Friendly Output',
    description:
      'Get a clean, organized summary with clear instructions for medicine name, dosage, timing, purpose, and safety warnings.',
    detail: 'Formatted for easy reading by patients and caregivers without medical background.'
  },
  {
    id: '05',
    title: 'Voice Explanation',
    description:
      'Audio playback in English or Hindi helps non-literate and elderly patients understand their medication plan clearly.',
    detail: 'Available on-demand to support better medication adherence and patient confidence.'
  },
  {
    id: '06',
    title: 'Secure & Private',
    description:
      'All data is encrypted and processed securely. Prescriptions are not stored permanently unless explicitly saved by the user.',
    detail: 'Compliant with healthcare data protection standards and patient privacy regulations.'
  },
]

const benefits = [
  { title: 'Reduces Medication Errors', desc: 'Clear interpretation prevents dosage mistakes and adverse interactions.' },
  { title: 'Improves Patient Compliance', desc: 'Patients who understand their medications are more likely to take them correctly.' },
  { title: 'Saves Clinic Time', desc: 'Faster patient onboarding and fewer clarification calls from confused patients.' },
  { title: 'Accessible Healthcare', desc: 'Bridges language and literacy barriers in prescription communication.' },
]

export default function HowItWorks() {
  return (
    <main className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass noise-overlay rounded-3xl p-8 md:p-12 border border-blue-200/20 mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-blue-200/75 mb-3">Complete Product Workflow</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            How MediLens Works
            <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Step-by-step prescription intelligence
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            MediLens uses medical-grade OCR and AI to transform prescription photos into clear, patient-friendly medication guidance. Learn how the platform works and what to expect at each stage.
          </p>
        </motion.div>

        {/* Main Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">The Six-Step Process</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass rounded-2xl p-7 border border-blue-200/20 hover:border-blue-200/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-12 h-12 flex items-center justify-center font-bold text-white flex-shrink-0">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-slate-300 mb-3 leading-relaxed">{step.description}</p>
                <p className="text-slate-400 text-sm border-t border-white/10 pt-3">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl p-6 border border-emerald-200/20"
              >
                <h4 className="text-lg font-semibold text-emerald-100 mb-2">{benefit.title}</h4>
                <p className="text-slate-300 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass noise-overlay rounded-2xl p-8 border border-amber-200/30 bg-gradient-to-r from-amber-500/5 to-transparent mb-12"
        >
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <span className="text-2xl">⚕️</span> Important Medical Notice
          </h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            <strong>MediLens is a communication aid, not a medical device or prescription replacement.</strong> The platform helps patients and caregivers understand prescriptions more clearly. All medication decisions and prescription interpretations must be reviewed and approved by qualified healthcare professionals.
          </p>
          <p className="text-slate-300 leading-relaxed">
            If you have concerns about your medication, always consult your doctor, pharmacist, or healthcare provider directly.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block">
            <Link to="/analyze">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Try the Scanner Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
