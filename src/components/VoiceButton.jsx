import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VoiceButton({ text }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [language, setLanguage] = useState('en-IN')
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="space-y-4">
      {/* Play Button */}
      <motion.button
        onClick={handleSpeak}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-400/40 border border-emerald-100/25"
      >
        <motion.span
          animate={isSpeaking ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: isPlaying ? 1 : 0, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.span>
        {isPlaying ? 'Stop Playback' : 'Play Explanation'}
      </motion.button>

      {/* Language Toggle */}
      <div className="flex gap-2">
        {[
          { code: 'en-IN', label: '🇮🇳 English', name: 'English' },
          { code: 'hi-IN', label: 'हिन्दी', name: 'Hindi' },
        ].map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              if (isPlaying) {
                window.speechSynthesis.cancel()
                setIsPlaying(false)
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              language === lang.code
                ? 'bg-emerald-500 text-white border border-emerald-200/30'
                : 'bg-slate-900/70 border border-emerald-200/25 text-slate-300 hover:border-emerald-200/70'
            }`}
          >
            {lang.label}
          </motion.button>
        ))}
      </div>

      {/* Speaking Indicator */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-1 text-emerald-300 text-sm"
          >
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
              🔊
            </motion.span>
            Speaking...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
