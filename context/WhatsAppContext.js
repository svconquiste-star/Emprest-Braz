'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WhatsAppContext = createContext()

const WHATSAPP_NUMBERS = {
  primary: '5531987008478',    // 60%
  secondary: '5531973443985'   // 40%
}

export function WhatsAppProvider({ children }) {
  const [currentNumber, setCurrentNumber] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visitCount = parseInt(localStorage.getItem('whatsappVisitCount') || '0')
      const nextVisitCount = visitCount + 1
      localStorage.setItem('whatsappVisitCount', nextVisitCount.toString())

      // Balanceamento 60/40: a cada 10 visitas, 6 vão para primary e 4 para secondary
      const positionIn10 = nextVisitCount % 10
      const selectedNumber = positionIn10 <= 6 ? WHATSAPP_NUMBERS.primary : WHATSAPP_NUMBERS.secondary

      setCurrentNumber(selectedNumber)
    }
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
