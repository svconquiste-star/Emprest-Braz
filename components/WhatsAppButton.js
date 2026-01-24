'use client'

import { useState } from 'react'
import { useCityContext } from '../context/CityContext'
import CityWarningModal from './CityWarningModal'
import WhatsAppFormModal from './WhatsAppFormModal'
import { getTrackingManager } from '../lib/tracking'

export default function WhatsAppButton() {
  const { selectedCity, isCityCovered } = useCityContext()
  const [showWarning, setShowWarning] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  const handleWhatsAppClick = (e) => {
    e.preventDefault()
    
    if (!selectedCity) {
      return
    }

    if (!isCityCovered) {
      const tracking = getTrackingManager()
      if (tracking) {
        tracking.trackCityNotAvailable(selectedCity)
      }
      setShowWarning(true)
      return
    }

    const tracking = getTrackingManager()
    if (tracking) {
      tracking.trackLead(selectedCity, '', '', '')
    }
    setShowFormModal(true)
  }

  const isButtonDisabled = !selectedCity || !isCityCovered

  return (
    <>
      <div className="whatsapp-button-container">
        <button 
          className={`cta-button ${isButtonDisabled ? 'btn-disabled' : 'active'}`}
          onClick={handleWhatsAppClick}
          disabled={isButtonDisabled}
          title={!selectedCity ? 'Selecione uma cidade' : !isCityCovered ? 'Cidade não atendida' : 'Clique para falar com especialista'}
          type="button"
        >
          Falar com Especialista
        </button>
      </div>
      {showWarning && <CityWarningModal onClose={() => setShowWarning(false)} />}
      {showFormModal && <WhatsAppFormModal onClose={() => setShowFormModal(false)} />}
    </>
  )
}
