'use client'

const PIXEL_ID = '1013145803462320'
const N8N_WEBHOOK_URL = 'https://n8n.multinexo.com.br/webhook/fc21d45c-e8e6-464b-b555-f78238f85239'

class TrackingManager {
  constructor() {
    this.sentEventIds = new Set()
    this.pageStartTime = Date.now()
    this.scrollPercentage = 0
    this.initScrollTracking()
  }

  initScrollTracking() {
    if (typeof window === 'undefined') return
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      this.scrollPercentage = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      
      this.trackScrollMilestones()
    })
  }

  trackScrollMilestones() {
    const milestones = [25, 50, 75, 100]
    milestones.forEach(milestone => {
      if (this.scrollPercentage >= milestone && !this.sentEventIds.has(`scroll_${milestone}`)) {
        this.trackEvent('ScrollMilestone', {
          scroll_percentage: milestone,
          time_on_page: this.getTimeOnPage()
        })
        this.sentEventIds.add(`scroll_${milestone}`)
      }
    })
  }

  generateEventId() {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    return `${timestamp}_${randomString}`
  }

  async hashSHA256(text) {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  normalizeEmail(email) {
    return email.toLowerCase().trim()
  }

  normalizePhone(phone) {
    return phone.replace(/\D/g, '')
  }

  detectarDispositivo() {
    if (typeof window === 'undefined') return 'unknown'
    const ua = navigator.userAgent.toLowerCase()
    if (/mobile|android|iphone|ipod/.test(ua)) return 'mobile'
    if (/tablet|ipad/.test(ua)) return 'tablet'
    return 'desktop'
  }

  obterSistemaOperacional() {
    if (typeof window === 'undefined') return 'unknown'
    const ua = navigator.userAgent.toLowerCase()
    if (/windows/.test(ua)) return 'windows'
    if (/macintosh|macos/.test(ua)) return 'macos'
    if (/linux/.test(ua)) return 'linux'
    if (/android/.test(ua)) return 'android'
    if (/iphone|ipad|ipod/.test(ua)) return 'ios'
    return 'unknown'
  }

  getTimeOnPage() {
    return Math.round((Date.now() - this.pageStartTime) / 1000)
  }

  validateEventData(data) {
    const errors = []
    
    if (!data.event_id || typeof data.event_id !== 'string') {
      errors.push('event_id é obrigatório e deve ser uma string')
    }
    
    if (!data.event_name || typeof data.event_name !== 'string') {
      errors.push('event_name é obrigatório e deve ser uma string')
    }
    
    if (!data.timestamp || typeof data.timestamp !== 'number') {
      errors.push('timestamp é obrigatório e deve ser um número')
    }
    
    if (data.em && !/^[a-f0-9]{64}$/.test(data.em)) {
      errors.push('email hash deve ser SHA-256 válido')
    }
    
    if (data.ph && !/^[a-f0-9]{64}$/.test(data.ph)) {
      errors.push('phone hash deve ser SHA-256 válido')
    }
    
    return { valid: errors.length === 0, errors }
  }

  sanitizeForPixel(data) {
    const sanitized = {
      event_id: data.event_id || '',
      event_name: data.event_name || '',
      event_time: data.timestamp || Date.now(),
      event_source_url: typeof window !== 'undefined' ? window.location.href : '',
      user_data: {}
    }
    
    if (data.em) sanitized.user_data.em = data.em
    if (data.ph) sanitized.user_data.ph = data.ph
    if (data.client_user_agent) sanitized.user_data.client_user_agent = data.client_user_agent
    if (data.client_ip_address) sanitized.user_data.client_ip_address = data.client_ip_address
    
    if (data.value) sanitized.value = data.value
    if (data.currency) sanitized.currency = data.currency
    if (data.content_type) sanitized.content_type = data.content_type
    if (data.content_id) sanitized.content_id = data.content_id
    
    return sanitized
  }

  async trackEvent(eventName, customData = {}) {
    try {
      const eventId = this.generateEventId()
      const timestamp = Date.now()
      
      const eventData = {
        event_id: eventId,
        event_name: eventName,
        timestamp,
        content_type: 'product',
        content_id: 'emprestimo',
        currency: 'BRL',
        device_type: this.detectarDispositivo(),
        operating_system: this.obterSistemaOperacional(),
        time_on_page: this.getTimeOnPage(),
        scroll_percentage: this.scrollPercentage,
        ...customData
      }
      
      if (this.sentEventIds.has(eventId)) {
        console.warn(`Evento duplicado detectado: ${eventId}`)
        return
      }
      
      const validation = this.validateEventData(eventData)
      if (!validation.valid) {
        console.error('Erro de validação:', validation.errors)
        return
      }
      
      this.sentEventIds.add(eventId)
      
      const pixelData = this.sanitizeForPixel(eventData)
      
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, {
          value: pixelData.value,
          currency: pixelData.currency,
          content_type: pixelData.content_type,
          content_id: pixelData.content_id
        })
      }
      
      await this.sendToN8N(eventData)
      
    } catch (error) {
      console.error('Erro ao rastrear evento:', error)
    }
  }

  async sendToN8N(eventData) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...eventData,
          timestamp: new Date(eventData.timestamp).toISOString(),
          source: 'web'
        }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        // Silenciar erro em desenvolvimento
      }
    } catch (error) {
      // Silenciar erros de fetch em desenvolvimento
      if (error.name !== 'AbortError') {
        // Erro silencioso
      }
    }
  }

  async trackLead(city, phone, email, name = '') {
    const emailHash = email ? await this.hashSHA256(this.normalizeEmail(email)) : null
    const phoneHash = phone ? await this.hashSHA256(this.normalizePhone(phone)) : null
    
    await this.trackEvent('Lead', {
      cidade: city,
      nome: name,
      telefone: phone,
      em: emailHash,
      ph: phoneHash
    })
  }

  async trackContact(city, phone, email, name = '') {
    const emailHash = email ? await this.hashSHA256(this.normalizeEmail(email)) : null
    const phoneHash = phone ? await this.hashSHA256(this.normalizePhone(phone)) : null
    
    await this.trackEvent('Contact', {
      cidade: city,
      nome: name,
      telefone: phone,
      em: emailHash,
      ph: phoneHash
    })
  }

  async trackConversaIniciada(city, phone, email, name = '') {
    const emailHash = email ? await this.hashSHA256(this.normalizeEmail(email)) : null
    const phoneHash = phone ? await this.hashSHA256(this.normalizePhone(phone)) : null
    
    await this.trackEvent('ConversaIniciada', {
      event_identification: phoneHash,
      event_category: 'engagement',
      cidade: city,
      nome: name,
      telefone: phone,
      em: emailHash,
      ph: phoneHash,
      conversation_channel: 'whatsapp',
      conversation_status: 'initiated'
    })
  }

  trackViewContent(city = null) {
    this.trackEvent('ViewContent', {
      cidade: city
    })
  }

  trackCityNotAvailable(city) {
    this.trackEvent('CityNotAvailable', {
      cidade: city
    })
  }

  trackValidationError(field, message) {
    this.trackEvent('ValidationError', {
      field,
      message
    })
  }

  trackContactError(errorMessage) {
    this.trackEvent('ContactError', {
      error_message: errorMessage
    })
  }
}

let trackingInstance = null

export function getTrackingManager() {
  if (typeof window === 'undefined') return null
  if (!trackingInstance) {
    trackingInstance = new TrackingManager()
  }
  return trackingInstance
}

export default TrackingManager
