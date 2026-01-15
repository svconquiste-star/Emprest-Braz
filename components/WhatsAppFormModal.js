'use client'

import { useState, useEffect } from 'react'
import { useCityContext } from '../context/CityContext'
import { useWhatsAppContext } from '../context/WhatsAppContext'

export default function WhatsAppFormModal({ onClose }) {
  const { selectedCity } = useCityContext()
  const { getCurrentNumber } = useWhatsAppContext()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: selectedCity || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsSubmitting(true)

    const whatsappNumber = getCurrentNumber()
    const message = `Olá Braz Empréstimos! Meu nome é ${formData.name}, sou de ${formData.city}, meu email é ${formData.email} e meu telefone é ${formData.phone}. Gostaria de saber mais sobre empréstimos.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ConversaIniciada');
    }

    // Enviar automaticamente após 500ms
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      
      setTimeout(() => {
        onClose()
        setIsSubmitting(false)
      }, 500)
    }, 500)
  }

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Fale com um Especialista</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome *</label>
            <input 
              type="text" 
              name="name"
              placeholder="Seu nome completo" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cidade *</label>
            <input 
              type="text" 
              name="city"
              placeholder="Sua cidade" 
              value={formData.city}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input 
              type="email" 
              name="email"
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone/WhatsApp *</label>
            <input 
              type="tel" 
              name="phone"
              placeholder="(31) 99999-9999" 
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Redirecionando...' : 'Falar no WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  )
}
