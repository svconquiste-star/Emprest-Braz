export default function Proof() {
  const numbers = [
    {
      value: '94%',
      label: 'Satisfação média nos atendimentos'
    },
    {
      value: 'R$ 12 mi',
      label: 'Em crédito liberado em 2024'
    },
    {
      value: '5min',
      label: 'Tempo médio para iniciar a conversa'
    },
    {
      value: 'Zero',
      label: 'Custos para simular e cancelar'
    }
  ]

  return (
    <section className="proof" aria-labelledby="proof">
      <div className="testimonial">
        <div className="section-head" style={{ marginBottom: '18px' }}>
          <h2 id="proof">Voz de quem já recebeu</h2>
        </div>
        <blockquote>
          "Fiz o contato às 9h, às 11h já tinha resposta e a documentação sendo enviada. Tudo direto no WhatsApp e com total transparência."
          <footer>— Renata M., Contagem</footer>
        </blockquote>
      </div>
      <div className="numbers" aria-label="Indicadores">
        {numbers.map((item, index) => (
          <div key={index}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
