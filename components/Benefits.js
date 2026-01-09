export default function Benefits() {
  const features = [
    {
      icon: 'fa-shield-heart',
      title: 'Proteção total',
      description: 'Documentos validados com segurança digital e equipe treinada para garantir confidencialidade.'
    },
    {
      icon: 'fa-person-chalkboard',
      title: 'Especialista dedicado',
      description: 'Você fala com uma pessoa real que guia cada etapa da simulação até a assinatura.'
    },
    {
      icon: 'fa-bolt',
      title: 'Liberação ágil',
      description: 'Processos digitalizados que aceleram análise e desembolso, sem filas e sem complicação.'
    },
    {
      icon: 'fa-mobile-screen',
      title: 'WhatsApp first',
      description: 'Todo o fluxo acontece no aplicativo que você já usa, com registros para consultar quando quiser.'
    }
  ]

  return (
    <section aria-labelledby="benefits">
      <div className="section-head">
        <h2 id="benefits">Por que confiar no nosso atendimento</h2>
        <p>Tratamos cada solicitação como prioridade. Ajudamos a reorganizar suas contas e garantimos clareza nas taxas antes de qualquer assinatura.</p>
      </div>
      <div className="features">
        {features.map((feature, index) => (
          <article key={index} className="feature-card">
            <i className={`fa-solid ${feature.icon}`}></i>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
