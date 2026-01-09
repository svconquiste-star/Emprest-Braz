'use client'

import { useState } from 'react'
import { useModal } from '@/context/ModalContext'

const WHATSAPP_LINK = "https://wa.me/553173443985?text=Quero%20saber%20mais%20sobre%20empr%C3%A9stimo"
const OUTRAS_CIDADES = "OUTRAS CIDADES"
const CIDADES = ["SÃO JOAQUIM DE BICAS", "BETIM", "CONTAGEM", "IBIRITÉ", OUTRAS_CIDADES]
const ATENDIDAS = new Set(CIDADES.filter(cidade => cidade !== OUTRAS_CIDADES))

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [whatsappEnabled, setWhatsappEnabled] = useState(false)
  const { openModal } = useModal()

  const handleCityClick = (cidade) => {
    setSelectedCity(cidade)

    try {
      if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'CidadeSelecionada', { cidade })
      }
    } catch (e) {}

    if (cidade === OUTRAS_CIDADES || !ATENDIDAS.has(cidade)) {
      setWhatsappEnabled(false)
      openModal()
      return
    }
    setWhatsappEnabled(true)
  }

  const handleCityRequest = () => {
    setWhatsappEnabled(false)
    openModal()
  }

  return (
    <aside className="hero-panel" aria-label="Seleção de cidade e WhatsApp">
      <div className="panel-head">
        <span><i className="fa-solid fa-location-dot"></i> Cobertura ativa</span>
        <h2>Qual cidade você mora?</h2>
      </div>
      <p className="panel-note">
        Clique na sua cidade para liberar o atendimento direto com o especialista no WhatsApp.
      </p>
      <div className="city-grid" role="group" aria-label="Lista de cidades atendidas">
        {CIDADES.map((cidade) => (
          <button
            key={cidade}
            type="button"
            className={`city-btn ${selectedCity === cidade ? 'selected' : ''}`}
            onClick={() => handleCityClick(cidade)}
          >
            <span className="label">{cidade}</span>
            <span className="dot" aria-hidden="true"></span>
          </button>
        ))}
      </div>
      <button className="city-link" type="button" onClick={handleCityRequest}>
        Minha cidade não está na lista
      </button>
      <div className="cta">
        <a
          id="zapBtn"
          className={`btn btn-whats ${whatsappEnabled ? 'active' : 'btn-disabled'}`}
          href={whatsappEnabled ? WHATSAPP_LINK : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            try {
              if (typeof fbq !== 'undefined') {
                fbq('trackCustom', 'ConversaIniciada')
              }
            } catch (e) {}
          }}
          aria-disabled={!whatsappEnabled}
        >
          <i className="fa-brands fa-whatsapp"></i>
          Falar com especialista
        </a>
        <small>Atendimento humano, dados protegidos.</small>
      </div>
    </aside>
  )
}
