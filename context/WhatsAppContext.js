'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WhatsAppContext = createContext()

const WHATSAPP_NUMBERS = {
  primary: '5531973523944'
}

export function WhatsAppProvider({ children }) {
  const [currentNumber, setCurrentNumber] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setCurrentNumber(WHATSAPP_NUMBERS.primary)
    setIsLoaded(true)
  }, [])

  const getCurrentNumber = () => {
    return currentNumber || WHATSAPP_NUMBERS.primary
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
