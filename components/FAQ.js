export default function FAQ() {
  const faqs = [
    {
      question: 'Os dados enviados ficam seguros?',
      answer: 'Sim. Utilizamos armazenamento criptografado e acesso restrito à equipe responsável. Todos os dados podem ser excluídos mediante solicitação.'
    },
    {
      question: 'Existe algum custo para simular?',
      answer: 'Não. A análise é 100% gratuita e somente seguimos para assinatura se você aprovar as condições.'
    },
    {
      question: 'Quais documentos preciso ter em mãos?',
      answer: 'Documento oficial com foto, comprovante de renda e comprovante de residência atualizado. Caso precise de algo extra, avisaremos durante o atendimento.'
    },
    {
      question: 'E se a minha cidade ainda não estiver disponível?',
      answer: 'Mostramos um aviso e registramos seu interesse para priorizar a expansão. Assim que liberarmos, você recebe uma mensagem automática no WhatsApp.'
    }
  ]

  return (
    <section aria-labelledby="faq">
      <div className="section-head">
        <h2 id="faq">Perguntas frequentes</h2>
        <p>Dúvidas rápidas para você iniciar sua solicitação agora mesmo.</p>
      </div>
      <div className="faq">
        {faqs.map((faq, index) => (
          <details key={index}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
