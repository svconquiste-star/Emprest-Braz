'use client'

import { useEffect } from 'react'

export default function CityWarningModal({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cidade Não Atendida</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p className="warning-message">
            No Momento Não Estamos Atuando Na Cidade Selecionada, Mas Breve iremos chegar Na Sua Cidade
          </p>
        </div>
        <button className="modal-close-btn" onClick={onClose}>Entendi</button>
      </div>
    </div>
  )
}
