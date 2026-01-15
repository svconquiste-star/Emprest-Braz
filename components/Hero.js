'use client'

export default function Hero({ onContactClick }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-pill">Atendimento Rápido</div>
        <div className="hero-card">
          <h1>Escolha sua cidade e destrave o atendimento VIP no WhatsApp</h1>
          <p className="hero-lead">Um especialista da nossa equipe entra em contato em poucos minutos para consultar sua situação com segurança, transparência e agilidade. O PIX sai na sua conta em até 24h.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">+2.500</div>
              <div className="hero-stat-label">Liberações concluídas</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">9/10</div>
              <div className="hero-stat-label">Clientes satisfeitos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
