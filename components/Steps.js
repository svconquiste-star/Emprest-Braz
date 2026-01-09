export default function Steps() {
  const steps = [
    {
      number: '1',
      title: 'Selecione a cidade',
      description: 'Confirmamos se sua região já está ativa. Caso não esteja, você recebe o aviso e entra na fila de expansão.'
    },
    {
      number: '2',
      title: 'Conversa no WhatsApp',
      description: 'Especialista faz as perguntas essenciais e monta a simulação sob medida para seu perfil.'
    },
    {
      number: '3',
      title: 'Envio de documentos',
      description: 'Upload guiado com checklist simples. Tudo conferido e protegido com autenticação.'
    },
    {
      number: '4',
      title: 'Assinatura e PIX',
      description: 'Contrato digital, assinatura segura e liberação do valor imediatamente após aprovação.'
    }
  ]

  return (
    <section aria-labelledby="steps">
      <div className="section-head">
        <h2 id="steps">Como funciona na prática</h2>
        <p>Simplificamos a jornada com poucos passos. Você acompanha tudo pelo WhatsApp e fica sabendo quando cada etapa é concluída.</p>
      </div>
      <div className="timeline">
        {steps.map((step) => (
          <article key={step.number} className="step">
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
