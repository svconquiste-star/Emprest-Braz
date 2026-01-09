'use client'

import { useState } from 'react'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: 'Qual é o valor mínimo?', a: 'O valor mínimo é R$ 500,00' },
    { q: 'Preciso de documentos?', a: 'Sim, você precisará de RG, CPF e comprovante de renda' },
    { q: 'Quanto tempo leva?', a: 'Em média 15 minutos para iniciar o atendimento' },
    { q: 'Vocês consultam SPC?', a: 'Não, não consultamos SPC ou Serasa' },
  ]

  return (
    <section className="section">
      <h2>Perguntas frequentes</h2>
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
