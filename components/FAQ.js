'use client'

import { useState } from 'react'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: 'Os dados enviados ficam seguros?', a: 'Sim, utilizamos criptografia de ponta a ponta e protocolos de segurança internacionais para proteger seus dados pessoais e financeiros.' },
    { q: 'Existe algum custo escondido?', a: 'Não, somos transparentes. Você saberá exatamente quanto vai pagar antes de assinar qualquer contrato.' },
    { q: 'Quanto documentos preciso ter em mãos?', a: 'Você precisará de RG, CPF, comprovante de renda e comprovante de endereço. Tudo pode ser enviado pelo WhatsApp.' },
    { q: 'E se minha cidade não estiver disponível?', a: 'Você pode entrar em contato mesmo assim. Estamos expandindo constantemente e podemos analisar sua situação.' },
  ]

  return (
    <section className="section">
      <h2>Perguntas frequentes</h2>
      <p style={{ marginBottom: '24px', fontSize: '15px', color: 'var(--muted)' }}>Informações rápidas para você entender como a gente funciona:</p>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <span>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="faq-answer">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
