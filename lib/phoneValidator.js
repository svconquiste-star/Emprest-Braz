'use client'

export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '')
  
  if (!cleaned) {
    return {
      valid: false,
      error: 'Telefone é obrigatório'
    }
  }
  
  if (cleaned.length === 10 || cleaned.length === 11) {
    return {
      valid: true,
      error: null,
      formatted: cleaned
    }
  }
  
  return {
    valid: false,
    error: 'Telefone inválido. Use o formato: DD + 8 ou 9 dígitos (ex: 31987654321 ou 3187654321)'
  }
}

export function formatPhoneDisplay(phone) {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}
