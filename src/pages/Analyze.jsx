import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UploadBox from '../components/UploadBox'
import ResultCard from '../components/ResultCard'
import VoiceButton from '../components/VoiceButton'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

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

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze prescription')
      }

      const data = await response.json()
      setResult(data)
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
    <main className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-44 h-44 rounded-full bg-emerald-300/10 blur-3xl pointer-events-none" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 relative">
            Analyze Your
            <span className="block bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-100 bg-clip-text text-transparent">
              Prescription
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Upload a clear image of your prescription and let AI decode it instantly
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Upload Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass noise-overlay rounded-2xl p-4 border border-emerald-200/20">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">Input panel</p>
              <p className="text-sm text-slate-300 mt-1">Use a clear image for best OCR confidence and medicine matching.</p>
            </div>
            <UploadBox
              onUpload={handleImageUpload}
              preview={preview}
              fileInputRef={fileInputRef}
            />

            {preview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass p-4 rounded-xl border border-emerald-200/25"
              >
                <motion.img
                  src={preview}
                  alt="Prescription preview"
                  className="w-full h-auto rounded-lg object-cover max-h-96"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAnalyze}
                disabled={!preview || loading}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  loading || !preview
                    ? 'bg-slate-800 text-white/50 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-emerald-300 border-t-transparent rounded-full"
                    />
                    Analyzing...
                  </span>
                ) : (
                  <span>🔍 Analyze</span>
                )}
              </motion.button>

              {preview && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Reset
                </motion.button>
              )}
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-rose-500/10 border border-rose-500/40 rounded-lg text-rose-200"
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Result Section */}
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
                
                {/* Voice Controls */}
                <motion.div 
                  className="glass noise-overlay p-6 rounded-xl border border-emerald-200/20 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="text-lg font-semibold">🔊 Listen to Explanation</h3>
                  <VoiceButton text={result.fullExplanation} />
                </motion.div>

                {/* Editable OCR Box */}
                {result.ocr_text && (
                  <motion.div
                    className="glass noise-overlay p-6 rounded-xl border border-emerald-200/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold mb-3">📝 Prescription Text (Editable)</h3>
                    <textarea
                      defaultValue={result.ocr_text}
                      className="w-full h-32 p-4 rounded-xl"
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
                  <div className="glass noise-overlay p-12 rounded-2xl border border-emerald-200/20 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      📸
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Upload a Prescription</h3>
                    <p className="text-slate-300">
                      Upload a clear image of your prescription to get started
                    </p>
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
