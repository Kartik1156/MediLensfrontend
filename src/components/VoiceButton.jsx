import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function VoiceButton({ text }) {
  const { language, copy } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [voiceLanguage, setVoiceLanguage] = useState(language === 'hi' ? 'hi-IN' : 'en-IN')
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    setVoiceLanguage(language === 'hi' ? 'hi-IN' : 'en-IN')
  }, [language])

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
    utterance.lang = voiceLanguage
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
      <motion.button
        onClick={handleSpeak}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-300/50 border border-emerald-200/60"
      >
        <motion.span
          animate={isSpeaking ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: isPlaying ? 1 : 0, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.span>
        {isPlaying ? copy.voice.stop : copy.voice.play}
      </motion.button>

      <div className="flex gap-2">
        {[
          { code: 'en-IN', label: copy.voice.english },
          { code: 'hi-IN', label: copy.voice.hindi },
        ].map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => {
              setVoiceLanguage(lang.code)
              if (isPlaying) {
                window.speechSynthesis.cancel()
                setIsPlaying(false)
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              voiceLanguage === lang.code
                ? 'bg-emerald-600 text-white border border-emerald-200/60'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'
            }`}
          >
            {lang.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-1 text-emerald-700 text-sm"
          >
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
              🔊
            </motion.span>
            {copy.voice.speaking}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
