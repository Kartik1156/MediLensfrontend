import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UploadBox from '../components/UploadBox'
import ResultCard from '../components/ResultCard'
import VoiceButton from '../components/VoiceButton'
import { useLanguage } from '../context/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Analyze() {
  const { copy } = useLanguage()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

  const normalizeResult = (responseData) => {
    const payload = responseData?.data || responseData || {}

    let parsedExplanation = payload?.explanation || {}
    if (typeof parsedExplanation === 'string') {
      try {
        parsedExplanation = JSON.parse(parsedExplanation)
      } catch {
        parsedExplanation = { fullExplanation: parsedExplanation }
      }
    }

    return {
      medicine: parsedExplanation?.medicine || 'N/A',
      dosage: parsedExplanation?.dosage || 'N/A',
      purpose: parsedExplanation?.purpose || 'N/A',
      precautions: parsedExplanation?.precautions || 'N/A',
      fullExplanation: parsedExplanation?.fullExplanation || 'No explanation available.',
      ocr_text: payload?.extractedText || '',
      confidence: payload?.confidence,
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target.result)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please upload an image first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch(`${apiBaseUrl}/api/prescription/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        let errorMessage = 'Failed to analyze prescription'
        try {
          const errorData = await response.json()
          errorMessage = errorData?.message || errorMessage
        } catch {
          // Keep default message if response is not JSON.
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setResult(normalizeResult(data))
    } catch (err) {
      setError(err.message || 'Error analyzing prescription. Please try again.')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setLoading(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="py-10 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12 relative pt-4">
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-80 h-80 rounded-full bg-cyan-200/40 blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 text-xs font-semibold uppercase tracking-[0.24em] mb-5">
            {copy.analyze.badge}
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4 relative tracking-tight text-slate-900">
            {copy.analyze.title}
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {copy.analyze.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-8 xl:gap-10 items-start">
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass noise-overlay rounded-[1.75rem] p-6 border border-cyan-200/60">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">{copy.analyze.panelTitle}</p>
              <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">{copy.analyze.panelBody}</p>
            </div>

            <UploadBox onUpload={handleImageUpload} preview={preview} fileInputRef={fileInputRef} />

            {preview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass p-4 rounded-[1.5rem] border border-cyan-200/60"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 mb-3">{copy.analyze.previewTitle}</p>
                <motion.img
                  src={preview}
                  alt="Prescription preview"
                  className="w-full h-auto rounded-[1rem] object-cover max-h-[34rem]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}

            <motion.div className="flex gap-4" variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAnalyze}
                disabled={!preview || loading}
                className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  loading || !preview ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'btn-primary'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full"
                    />
                    {copy.analyze.analyzing}
                  </span>
                ) : (
                  <span>🔍 {copy.analyze.analyze}</span>
                )}
              </motion.button>

              {preview && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="btn-secondary px-6 py-4 rounded-2xl"
                >
                  {copy.analyze.reset}
                </motion.button>
              )}
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700"
                >
                  ⚠️ {copy.analyze.errorPrefix}: {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                variants={itemVariants}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <ResultCard result={result} />

                <motion.div
                  className="glass noise-overlay p-6 rounded-[1.5rem] border border-emerald-200/60 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="text-lg md:text-xl font-semibold">🔊 {copy.analyze.listenTitle}</h3>
                  <VoiceButton text={result.fullExplanation} />
                </motion.div>

                {result.ocr_text && (
                  <motion.div
                    className="glass noise-overlay p-6 rounded-[1.5rem] border border-emerald-200/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold mb-3">📝 {copy.analyze.ocrTitle}</h3>
                    <textarea
                      defaultValue={result.ocr_text}
                      className="w-full h-36 p-4 rounded-2xl"
                      placeholder="Prescription text will appear here..."
                    />
                  </motion.div>
                )}
              </motion.div>
            ) : (
              !loading && (
                <motion.div
                  key="empty"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <div className="glass noise-overlay p-14 rounded-[2rem] border border-emerald-200/60 text-center max-w-xl w-full">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      📸
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{copy.analyze.emptyTitle}</h3>
                    <p className="text-slate-600 leading-relaxed">{copy.analyze.emptyBody}</p>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  )
}
