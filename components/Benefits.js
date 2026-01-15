export default function Benefits() {
  const benefits = [
    { icon: '🛡️', title: 'Proteção total', desc: 'Documentamos sua situação com segurança e criptografia de ponta a ponta' },
    { icon: '👨‍💼', title: 'Especialistas dedicado', desc: 'Cada caso é único. Você fala com especialista que entende sua situação' },
    { icon: '⚡', title: 'Liberação Ágil', desc: 'Você recebe a aprovação em minutos. Sem burocracia, sem enrolação' },
    { icon: '💬', title: 'WhatsApp First', desc: 'Tudo é resolvido direto no WhatsApp. Conversa humana, sem robô' },
  ]

  return (
    <section className="section">
      <h2>Por que escolher nossa equipe</h2>
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
