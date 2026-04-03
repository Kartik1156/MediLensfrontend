import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getSiteCopy } from '../content/siteCopy'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en'
    }

    return window.localStorage.getItem('medilens-language') || 'en'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('medilens-language', language)
    }

    document.documentElement.lang = language === 'hi' ? 'hi' : 'en'
    document.documentElement.dir = 'ltr'
  }, [language])

  const value = useMemo(() => {
    const copy = getSiteCopy(language)

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'hi' : 'en')),
      isHindi: language === 'hi',
      copy,
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}