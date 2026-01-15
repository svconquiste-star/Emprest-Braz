'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WhatsAppContext = createContext()

const WHATSAPP_NUMBERS = [
  '5531973443985',
  '5531987008478'
]

export function WhatsAppProvider({ children }) {
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedIndex = localStorage.getItem('whatsappNumberIndex')
      if (savedIndex !== null) {
        const nextIndex = (parseInt(savedIndex) + 1) % WHATSAPP_NUMBERS.length
        setCurrentNumberIndex(nextIndex)
        localStorage.setItem('whatsappNumberIndex', nextIndex.toString())
      } else {
        localStorage.setItem('whatsappNumberIndex', '0')
      }
    }
    setIsLoaded(true)
  }, [])

  const getCurrentNumber = () => {
    return WHATSAPP_NUMBERS[currentNumberIndex]
  }

  return (
    <WhatsAppContext.Provider value={{ getCurrentNumber, WHATSAPP_NUMBERS }}>
      {children}
    </WhatsAppContext.Provider>
  )
}

export function useWhatsAppContext() {
  const context = useContext(WhatsAppContext)
  if (!context) {
    throw new Error('useWhatsAppContext must be used within WhatsAppProvider')
  }
  return context
}
