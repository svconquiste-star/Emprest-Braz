'use client'

import { useEffect } from 'react'
import { useModal } from '@/context/ModalContext'

export default function Modal() {
  const { isOpen, closeModal } = useModal()

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeModal])

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal') {
      closeModal()
    }
  }

  return (
    <div
      id="modal"
      className={`modal ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-describedby="modalMessage"
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        <h2 id="modalTitle">Aviso importante</h2>
        <p id="modalMessage">
          No Momento Não Estamos Atuando Na Cidade Selecionada, Mas Breve iremos chegar Na Sua Cidade
        </p>
        <div className="modal-actions">
          <button
            className="modal-btn"
            type="button"
            onClick={closeModal}
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
