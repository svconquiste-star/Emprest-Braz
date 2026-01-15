export default function Proof() {
  const testimonials = [
    { quote: 'Fiz o contato às 9h, às 11h já tinha resposta e a documentação sendo enviada. Tudo direto no WhatsApp e com total transparência.', author: 'Renata M., Contagem' },
    { quote: 'Processo muito rápido e sem burocracia. Recomendo para todos que precisam de crédito urgente.', author: 'Carlos S., Betim' },
  ]

  const stats = [
    { value: '94%', label: 'Clientes satisfeitos' },
    { value: '5min', label: 'Tempo médio de resposta' },
    { value: 'Zero', label: 'Consulta SPC/Serasa' },
  ]

  return (
    <section className="section">
      <h2>Voz de quem já recebeu</h2>
      <p style={{ marginBottom: '24px', fontSize: '15px' }}>Somos a solução que mais cresce entre os clientes que precisam de crédito rápido, seguro e com transparência. Veja o que dizem sobre a gente:</p>
      <div className="proof-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="proof-card">
            <p className="proof-quote">&quot;{t.quote}&quot;</p>
            <p className="proof-author">— {t.author}</p>
          </div>
        ))}
      </div>
      <div className="proof-stats">
        {stats.map((s, i) => (
          <div key={i} className="proof-stat">
            <div className="proof-stat-value">{s.value}</div>
            <div className="proof-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
