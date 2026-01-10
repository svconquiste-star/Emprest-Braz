export default function Hero({ onContactClick }) {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ConversaIniciada');
    }
    window.open('https://wa.me/5531973443985?text=Olá%20Braz%20Empréstimos%2C%20gostaria%20de%20saber%20mais%20sobre%20empréstimos', '_blank');
  };

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
          <button className="cta-button" onClick={handleWhatsAppClick}>Falar com Especialista</button>
        </div>
      </div>
      <div className="hero-panel">
        <h3>Qual cidade você mora?</h3>
        <p className="hero-panel-desc">Clique na sua cidade para liberar o atendimento direto com o especialista no WhatsApp.</p>
        <div className="city-buttons">
          <button className="city-btn">SÃO JOAQUIM DE BICAS</button>
          <button className="city-btn">BETIM</button>
          <button className="city-btn">CONTAGEM</button>
          <button className="city-btn">IBIRITÉ</button>
          <button className="city-btn">OUTRAS CIDADES</button>
        </div>
        <input type="text" className="city-input" placeholder="Minha cidade não está na lista" />
        <button className="cta-button" onClick={handleWhatsAppClick}>Falar com Especialista</button>
      </div>
      <div className="hero-image-frame">
        <img src="https://via.placeholder.com/400x400?text=Mulher+com+Dinheiro" alt="Mulher com dinheiro" />
      </div>
    </section>
  )
}
