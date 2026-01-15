export default function Steps() {
  const steps = [
    { num: '1', title: 'Selecione a cidade', desc: 'Qualifique sua região na lista de atendimento' },
    { num: '2', title: 'Converse no WhatsApp', desc: 'Fale com especialista que vai entender seu caso' },
    { num: '3', title: 'Envie documentos', desc: 'Upload seguro com criptografia de ponta a ponta' },
    { num: '4', title: 'Receba e PIX', desc: 'Dinheiro na sua conta em até 24h' },
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
