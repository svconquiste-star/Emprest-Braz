'use client'

import { useState } from 'react'
import { useCityContext } from '../context/CityContext'
import CityWarningModal from './CityWarningModal'
import WhatsAppFormModal from './WhatsAppFormModal'

export default function WhatsAppButton() {
  const { selectedCity, isCityCovered } = useCityContext()
  const [showWarning, setShowWarning] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  const handleWhatsAppClick = (e) => {
    e.preventDefault()
    
    if (!selectedCity) {
      console.log('Nenhuma cidade selecionada')
      return
    }

    if (!isCityCovered) {
      console.log('Cidade não coberta:', selectedCity)
      setShowWarning(true)
      return
    }

    console.log('Abrindo formulário para:', selectedCity)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ConversaIniciada');
    }
    setShowFormModal(true)
  };

  const isButtonDisabled = !selectedCity || !isCityCovered

  return (
    <>
      <div className="whatsapp-button-container">
        <button 
          className={`cta-button ${isButtonDisabled ? 'btn-disabled' : 'active'}`}
          onClick={handleWhatsAppClick}
          disabled={isButtonDisabled}
          title={!selectedCity ? 'Selecione uma cidade' : !isCityCovered ? 'Cidade não atendida' : 'Clique para falar com especialista'}
        >
          Falar com Especialista
        </button>
      </div>
      {showWarning && <CityWarningModal onClose={() => setShowWarning(false)} />}
      {showFormModal && <WhatsAppFormModal onClose={() => setShowFormModal(false)} />}
    </>
  )
}
