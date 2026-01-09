'use client'

import { useState } from 'react'
import CitySelector from './CitySelector'

export default function Hero() {
  return (
    <header className="hero" role="banner">
      <div className="hero-left">
        <span className="hero-pill">
          <i className="fa-solid fa-sparkles"></i> Atendimento rápido
        </span>
        <div className="hero-image-frame">
          <img 
            src="https://www.pagoufacil.com.br/wp-content/uploads/2024/11/como-conseguir-dinheiro-rapido.png"
            alt="Cliente sorrindo segurando notas de dinheiro"
          />
        </div>
        <div className="hero-card">
          <h1>Está passando por dificuldades financeiras?</h1>
          <p className="hero-lead">
            Somos a equipe Braz Empréstimos: resolvemos pendências com urgência, sem enrolação e com conversa humana pelo WhatsApp.
          </p>
          <ul className="hero-checks" aria-label="Benefícios imediatos">
            <li>✔ Contas atrasadas te preocupando?</li>
            <li>✔ Precisando de dinheiro com urgência?</li>
            <li>✔ Sem consulta ao SPC/Serasa.</li>
            <li>✔ Dinheiro liberado na hora.</li>
          </ul>
          <div className="hero-stats" aria-label="Indicadores de confiança">
            <div>
              <strong>+3.500</strong>
              <span>Liberações concluídas</span>
            </div>
            <div>
              <strong>15 min</strong>
              <span>Tempo médio para iniciar o atendimento</span>
            </div>
          </div>
        </div>
      </div>

      <CitySelector />
    </header>
  )
}
