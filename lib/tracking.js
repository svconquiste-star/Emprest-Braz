'use client'

const PIXEL_ID = '1258132206414552'
const N8N_WEBHOOK_URL = 'https://n8n.multinexo.com.br/webhook/fc21d45c-e8e6-464b-b555-f78238f85239'

class TrackingManager {
  constructor() {
    this.sentEventIds = new Set()
    this.pageStartTime = Date.now()
    this.cachedFbCookies = null
    this.cachedExternalId = null
    this.initFbCookies()
    this.initExternalId()
  }

  initFbCookies() {
    try {
      let fbc = ''
      let fbp = ''
      const cookies = document.cookie.split(';').map(c => c.trim())
      for (const c of cookies) {
        if (c.startsWith('_fbc=')) fbc = c.slice(5)
        if (c.startsWith('_fbp=')) fbp = c.slice(5)
      }
      if (!fbc) {
        const params = new URLSearchParams(window.location.search)
        const fbclid = params.get('fbclid')
        if (fbclid) {
          fbc = `fb.1.${Date.now()}.${fbclid}`
        }
      }
      this.cachedFbCookies = { fbc, fbp }
    } catch {
      this.cachedFbCookies = { fbc: '', fbp: '' }
    }
  }

  initExternalId() {
    try {
      const KEY = 'visitor_external_id'
      let id = localStorage.getItem(KEY)
      if (!id) {
        id = `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
        localStorage.setItem(KEY, id)
      }
      this.cachedExternalId = id
    } catch {
      this.cachedExternalId = `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
    }
  }

  getFbCookies() {
    if (!this.cachedFbCookies) this.initFbCookies()
    return this.cachedFbCookies
  }

  getExternalId() {
    if (!this.cachedExternalId) this.initExternalId()
    return this.cachedExternalId
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

  async trackEvent(eventName, customData = {}) {
    try {
      const eventId = this.generateEventId()
      const timestamp = Date.now()

      const eventData = {
        event_id: eventId,
        event_name: eventName,
        timestamp,
        content_type: 'product',
        content_id: 'atendimento',
        currency: 'BRL',
        device_type: this.detectarDispositivo(),
        operating_system: this.obterSistemaOperacional(),
        time_on_page: this.getTimeOnPage(),
        ...customData
      }

      if (this.sentEventIds.has(eventId)) {
        console.warn(`Evento duplicado detectado: ${eventId}`)
        return
      }

      this.sentEventIds.add(eventId)

      // Enviar ao Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        const userProps = {}
        if (eventData.em) userProps.em = eventData.em
        if (eventData.ph) userProps.ph = eventData.ph
        if (eventData.fn) userProps.fn = eventData.fn
        if (eventData.ln) userProps.ln = eventData.ln
        if (eventData.ct) userProps.ct = eventData.ct
        if (eventData.client_user_agent) userProps.client_user_agent = eventData.client_user_agent
        const { fbc, fbp } = this.getFbCookies()
        if (fbc) userProps.fbc = fbc
        if (fbp) userProps.fbp = fbp
        const extId = this.getExternalId()
        if (extId) userProps.external_id = extId

        if (Object.keys(userProps).length > 0) {
          window.fbq('init', PIXEL_ID, userProps)
        }

        window.fbq('track', eventName, {
          currency: eventData.currency,
          content_type: eventData.content_type,
          content_id: eventData.content_id
        }, { eventID: eventData.event_id })
      }

      // Enviar ao N8N
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
      if (error.name !== 'AbortError') {
        // Erro silencioso
      }
    }
  }

  async trackContact(city, phone, email, name = '') {
    const emailHash = email ? await this.hashSHA256(this.normalizeEmail(email)) : null
    const phoneHash = phone ? await this.hashSHA256(this.normalizePhone(phone)) : null
    const fnHash = name ? await this.hashSHA256(name.trim().toLowerCase().split(' ')[0]) : null
    const lnHash = name && name.trim().split(' ').length > 1 ? await this.hashSHA256(name.trim().toLowerCase().split(' ').slice(-1)[0]) : null
    const ctHash = city ? await this.hashSHA256(city.trim().toLowerCase()) : null
    const { fbc, fbp } = this.getFbCookies()

    await this.trackEvent('Contact', {
      cidade: city,
      nome: name,
      telefone: phone,
      em: emailHash,
      ph: phoneHash,
      fn: fnHash,
      ln: lnHash,
      ct: ctHash,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      external_id: this.getExternalId(),
      client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    })
  }

  trackViewContent(city = null) {
    this.trackEvent('ViewContent', {
      cidade: city
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
