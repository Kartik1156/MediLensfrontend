import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import TypingEffect from '../components/TypingEffect'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Home() {
  const { copy } = useLanguage()

  return (
    <main className="relative pt-8 pb-20 overflow-hidden">
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 xl:gap-12 items-center py-8 md:py-12">
          <div className="space-y-6">
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-medical-200 bg-medical-50 text-medical-700 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              {copy.home.badge}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900 max-w-2xl"
            >
              <TypingEffect 
                text={copy.home.title} 
                speed={40}
                delayBetweenLoops={2000}
              />
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              {copy.home.description}
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-500 max-w-xl leading-relaxed">
              {copy.home.supporting}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Link to="/analyze" className="inline-block">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn-primary text-sm md:text-base px-6 py-3">
                  {copy.home.primaryCta}
                  <span className="ml-2">→</span>
                </motion.div>
              </Link>
              <Link to="/how-it-works" className="inline-block">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary text-sm md:text-base px-6 py-3">
                  {copy.home.secondaryCta}
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
              {copy.home.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600">
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-medical-200/70 blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-teal-200/70 blur-2xl"
            />

            <div className="glass rounded-[1.75rem] p-5 md:p-6 relative overflow-hidden">
              <div className="absolute right-4 top-4 h-20 w-20 rounded-full border border-medical-200/70" />
              <div className="absolute right-12 top-12 h-12 w-12 rounded-full bg-medical-100" />

              <div className="relative z-10 space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-medical-700">{copy.home.panelTitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{copy.home.panelSubtitle}</p>

                <div className="space-y-3 pt-1">
                  {copy.home.panelItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
                      className="rounded-xl bg-white border border-slate-200 p-3 flex items-start justify-between gap-4"
                    >
                      <div>
                        <span className="text-xs uppercase tracking-[0.16em] text-teal-700">{item.title}</span>
                        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{item.description}</p>
                      </div>
                      <span className="text-teal-600 text-lg">✓</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14"
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900">
          {copy.home.pillarsHeading}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-slate-600 mb-8 max-w-2xl mx-auto text-base md:text-lg">
          {copy.home.pillarsSubheading}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {copy.home.pillars.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass p-5 rounded-2xl border border-slate-200"
            >
              <div className="mb-3 h-10 w-10 rounded-xl bg-medical-100 border border-medical-200 grid place-items-center text-medical-700 text-sm font-semibold">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14"
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900">
          {copy.home.audienceHeading}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-slate-600 mb-8 max-w-2xl mx-auto text-base md:text-lg">
          {copy.home.audienceSubheading}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {copy.home.audience.map((useCase) => (
            <motion.div key={useCase.title} variants={itemVariants} className="glass rounded-2xl p-5 border border-slate-200">
              <h3 className="text-lg font-bold mb-3 text-medical-700">{useCase.title}</h3>
              <ul className="space-y-3">
                {useCase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-teal-600 font-bold text-lg leading-none mt-0.5">✓</span>
                    <span className="text-slate-700 text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14"
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="glass rounded-[1.75rem] p-6 md:p-7 border border-slate-200">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
            {copy.home.trustHeading}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-600 max-w-3xl text-base md:text-lg mb-6">
            {copy.home.trustSubheading}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.home.trust.map((item) => (
              <motion.div key={item.title} variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-base font-semibold text-medical-700 mb-1.5">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={itemVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="glass p-6 md:p-9 rounded-[1.75rem] border border-slate-200">
          <p className="text-xs uppercase tracking-[0.2em] text-medical-700 mb-3">MediLens</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 max-w-3xl mx-auto text-slate-900">
            {copy.home.ctaHeading}
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{copy.home.ctaBody}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/analyze">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn-primary text-sm md:text-base px-6 py-3">
                {copy.home.ctaPrimary}
              </motion.button>
            </Link>
            <Link to="/how-it-works">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn-secondary text-sm md:text-base px-6 py-3">
                {copy.home.ctaSecondary}
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.footer
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-7 border-t border-slate-200"
        initial={false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
          <div>
            <h4 className="font-bold text-lg mb-3 text-medical-700">MediLens</h4>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md">{copy.home.footer.about}</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 text-medical-700">{copy.home.footer.featuresTitle}</h4>
            <ul className="text-slate-600 text-sm space-y-1.5">
              {copy.home.footer.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 text-medical-700">{copy.home.footer.disclaimerTitle}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{copy.home.footer.disclaimer}</p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-5 text-center text-slate-500 text-sm">
          <p>&copy; 2026 MediLens. All rights reserved.</p>
        </div>
      </motion.footer>
    </main>
  )
}
