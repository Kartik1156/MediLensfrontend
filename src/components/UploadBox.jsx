import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function UploadBox({ onUpload, preview, fileInputRef }) {
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
      const changeEvent = {
        target: { files: files }
      }
      onUpload(changeEvent)
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
        className={`glass noise-overlay cursor-pointer block p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragActive
            ? 'border-emerald-300 bg-emerald-300/10 scale-105'
            : 'border-emerald-200/35 bg-slate-900/45 hover:border-emerald-200/60 hover:bg-slate-900/70'
        }`}
      >
        <motion.div
          className="text-center"
          animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
        >
          <motion.div
            animate={isDragActive ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl mb-3"
          >
            {isDragActive ? '📤' : '📸'}
          </motion.div>

          <h3 className="text-xl font-semibold mb-2">
            {isDragActive ? 'Drop your prescription here' : 'Upload Your Prescription'}
          </h3>

          <p className="text-slate-300 mb-4">
            Drag and drop or click to select an image
          </p>

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
            Choose File
          </motion.button>

          <p className="text-xs text-slate-400 mt-4">
            Supported formats: JPG, PNG, WebP (Max 10MB)
          </p>
        </motion.div>
      </motion.label>

      {/* Loading indicator for drag */}
      {isDragActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-2xl bg-emerald-300/5 pointer-events-none"
        />
      )}
    </motion.div>
  )
}
