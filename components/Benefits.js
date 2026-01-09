export default function Benefits() {
  const benefits = [
    { icon: '⚡', title: 'Rápido', desc: 'Dinheiro liberado em até 15 minutos' },
    { icon: '🔒', title: 'Seguro', desc: 'Sem consulta ao SPC/Serasa' },
    { icon: '💬', title: 'Humano', desc: 'Conversa direta pelo WhatsApp' },
  ]

  return (
    <section className="section">
      <h2>Por que confiar no nosso atendimento</h2>
      <div className="benefits-grid">
        {benefits.map((b, i) => (
          <div key={i} className="benefit-card">
            <div className="benefit-icon">{b.icon}</div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
