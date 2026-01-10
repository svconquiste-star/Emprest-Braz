'use client'

export default function Hero({ onContactClick }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-pill">Atendimento Rápido</div>
        <div className="hero-card">
          <h1>Está passando por dificuldades financeiras?</h1>
          <p className="hero-lead">Somos a equipe Braz Empréstimos: resolvemos pendências com urgência, sem enrolação e com conversa humana pelo WhatsApp.</p>
          <ul className="hero-checks">
            <li>Contas atrasadas te preocupando?</li>
            <li>Precisando de dinheiro com urgência?</li>
            <li>Sem consulta ao SPC/Serasa.</li>
            <li>Dinheiro liberado na hora.</li>
          </ul>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">+3.500</div>
              <div className="hero-stat-label">Liberações concluídas</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">15 min</div>
              <div className="hero-stat-label">Tempo médio para iniciar o atendimento</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
