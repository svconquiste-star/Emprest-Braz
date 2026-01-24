'use client'

import { useState, useEffect, useRef } from 'react'
import { useCityContext } from '../context/CityContext'
import { useWhatsAppContext } from '../context/WhatsAppContext'
import { validatePhone } from '../lib/phoneValidator'
import { getTrackingManager } from '../lib/tracking'

export default function WhatsAppFormModal({ onClose }) {
  const { selectedCity } = useCityContext()
  const { getCurrentNumber } = useWhatsAppContext()
  const modalRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: selectedCity || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'phone') {
      const validation = validatePhone(value)
      
      if (!validation.valid && value) {
        const tracking = getTrackingManager()
        if (tracking) {
          tracking.trackValidationError('phone', validation.error)
        }
      }
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const isFormValid = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else {
      const validation = validatePhone(formData.phone)
      if (!validation.valid) {
        newErrors.phone = validation.error
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      return
    }

    setIsSubmitting(true)

    try {
      const tracking = getTrackingManager()
      if (tracking) {
        await tracking.trackConversaIniciada(formData.city, formData.phone, formData.email, formData.name)
      }

      const whatsappNumber = getCurrentNumber()
      const message = `Olá! Quero fazer uma simulação de empréstimo. Moro em ${formData.city} e meu telefone é ${formData.phone}`
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      setTimeout(() => {
        window.open(whatsappUrl, '_blank')
        
        setTimeout(() => {
          onClose()
          setIsSubmitting(false)
        }, 500)
      }, 500)
    } catch (error) {
      const tracking = getTrackingManager()
      if (tracking) {
        tracking.trackContactError(error.message)
      }
      setIsSubmitting(false)
    }
  }

  const isPhoneValid = formData.phone ? validatePhone(formData.phone).valid : true
  const isFormComplete = formData.name.trim() && formData.email.trim() && isPhoneValid && selectedCity

  return (
    <div className="modal-overlay active" ref={modalRef} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Fale com um Especialista</h2>
          <button className="modal-close" onClick={onClose} type="button">×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome *</label>
            <input 
              id="name"
              type="text" 
              name="name"
              placeholder="Seu nome completo" 
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input 
              id="email"
              type="email" 
              name="email"
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone/WhatsApp *</label>
            <input 
              id="phone"
              type="tel" 
              name="phone"
              placeholder="(31) 99999-9999 ou 31 9999-9999" 
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city">Cidade *</label>
            <input 
              id="city"
              type="text" 
              name="city"
              placeholder="Sua cidade" 
              value={formData.city}
              onChange={() => {}}
              disabled
            />
          </div>

          <button 
            type="submit" 
            className="form-submit" 
            disabled={isSubmitting || !isFormComplete}
            title={!isFormComplete ? 'Preencha todos os campos corretamente' : ''}
          >
            {isSubmitting ? 'Redirecionando...' : 'Iniciar Conversa'}
          </button>
        </form>
      </div>
    </div>
  )
}
