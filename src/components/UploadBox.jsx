import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function UploadBox({ onUpload, preview, fileInputRef }) {
  const { copy } = useLanguage()
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      onUpload({ target: { files } })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={onUpload}
        accept="image/*"
        className="hidden"
        id="image-input"
      />

      <motion.label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        htmlFor="image-input"
        className={`glass noise-overlay cursor-pointer block p-8 rounded-[2rem] border-2 border-dashed transition-all duration-300 ${
          isDragActive
            ? 'border-cyan-300 bg-cyan-50 scale-[1.01]'
            : 'border-cyan-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/50'
        }`}
      >
        <motion.div className="text-center" animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}>
          <motion.div
            animate={isDragActive ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl mb-3"
          >
            {isDragActive ? '📤' : '📸'}
          </motion.div>

          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            {isDragActive ? copy.analyze.dropPrompt : copy.analyze.uploadTitle}
          </h3>

          <p className="text-slate-600 mb-5 max-w-md mx-auto leading-relaxed">{copy.analyze.uploadHint}</p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('image-input').click()
            }}
            className="btn-primary inline-block"
          >
            {copy.analyze.uploadAction}
          </motion.button>

          <p className="text-xs text-slate-500 mt-4">{copy.analyze.uploadFormats}</p>
        </motion.div>
      </motion.label>

      {isDragActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-[2rem] bg-cyan-200/35 pointer-events-none"
        />
      )}
    </motion.div>
  )
}
