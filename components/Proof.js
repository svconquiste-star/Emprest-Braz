export default function Proof() {
  const testimonials = [
    { quote: 'Fiz o contato às 9h, às 11h já tinha resposta e a documentação sendo enviada. Tudo direto no WhatsApp e com total transparência.', author: 'Renata M., Contagem' },
    { quote: 'Processo muito rápido e sem burocracia. Recomendo para todos que precisam de crédito urgente.', author: 'Carlos S., Betim' },
  ]

  return (
    <section className="section">
      <h2>Vou de quem já recebeu</h2>
      <div className="proof-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="proof-card">
            <p className="proof-quote">&quot;{t.quote}&quot;</p>
            <p className="proof-author">— {t.author}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
