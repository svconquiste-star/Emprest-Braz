export default function Steps() {
  const steps = [
    { num: '1', title: 'Contato', desc: 'Envie uma mensagem no WhatsApp' },
    { num: '2', title: 'Análise', desc: 'Analisamos sua situação' },
    { num: '3', title: 'Aprovação', desc: 'Receba a aprovação em minutos' },
    { num: '4', title: 'Liberação', desc: 'Dinheiro na sua conta' },
  ]

  return (
    <section className="section">
      <h2>Como funciona na prática</h2>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <div key={i} className="step-card">
            <div className="step-number">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
