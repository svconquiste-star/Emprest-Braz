'use client'

import { useEffect } from 'react'

export default function Modal({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Fale com um Especialista</h2>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>
        <div className="modal-body">
          <p>Selecione uma cidade para continuar.</p>
        </div>
        <button className="modal-close-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}
