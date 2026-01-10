'use client'

import { useState } from 'react'
import { useCityContext } from '../context/CityContext'
import CityWarningModal from './CityWarningModal'

export default function WhatsAppButton() {
  const { selectedCity, isCityCovered } = useCityContext()
  const [showWarning, setShowWarning] = useState(false)

  const handleWhatsAppClick = () => {
    if (!selectedCity) {
      return
    }

    if (!isCityCovered) {
      setShowWarning(true)
      return
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ConversaIniciada');
    }
    window.open('https://wa.me/5531973443985?text=Olá%20Braz%20Empréstimos%2C%20gostaria%20de%20saber%20mais%20sobre%20empréstimos', '_blank');
  };

  const isButtonDisabled = !selectedCity || !isCityCovered

  return (
    <>
      <div className="whatsapp-button-container">
        <button 
          className={`cta-button ${isButtonDisabled ? 'btn-disabled' : 'active'}`}
          onClick={handleWhatsAppClick}
          disabled={isButtonDisabled}
          title={!selectedCity ? 'Selecione uma cidade' : !isCityCovered ? 'Cidade não atendida' : ''}
        >
          Falar com Especialista
        </button>
      </div>
      {showWarning && <CityWarningModal onClose={() => setShowWarning(false)} />}
    </>
  )
}
