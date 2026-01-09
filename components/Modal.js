'use client'

import { useEffect } from 'react'

export default function Modal({ onClose }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Fale com um Especialista</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form className="modal-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" placeholder="Seu nome" />
          </div>
          <div className="form-group">
            <label>WhatsApp</label>
            <input type="tel" placeholder="(11) 99999-9999" />
          </div>
          <div className="form-group">
            <label>Mensagem</label>
            <textarea placeholder="Conte-nos como podemos ajudar"></textarea>
          </div>
          <button type="submit" className="form-submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}
