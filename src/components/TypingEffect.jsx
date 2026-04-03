import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TypingEffect({ text, className = '', speed = 50, delayBetweenLoops = 1500 }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    let timeoutId

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
        timeoutId = setTimeout(type, speed)
      } else {
        setIsTyping(false)
        // After finishing typing, wait before restarting
        setTimeout(() => {
          currentIndex = 0
          setIsTyping(true)
        }, delayBetweenLoops)
      }
    }

    type()

    return () => clearTimeout(timeoutId)
  }, [text, speed, delayBetweenLoops])

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-[3px] bg-gradient-to-b from-slate-900 to-medical-700 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ height: '1em' }}
      />
    </span>
  )
}
