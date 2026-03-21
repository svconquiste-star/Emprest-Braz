'use client'

import { useEffect, useState, useCallback } from 'react'
import { getTrackingManager } from '../lib/tracking'

const WHATSAPP_NUMBER = '553187008478'

export default function Home() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')
  const [nomeError, setNomeError] = useState('')
  const [telefoneError, setTelefoneError] = useState('')
  const [cidadeError, setCidadeError] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const tracking = getTrackingManager()
    if (tracking) {
      tracking.trackViewContent()
    }
  }, [])

  const validateForm = useCallback(() => {
    let valid = true

    if (!nome.trim()) {
      setNomeError('Nome é obrigatório')
      valid = false
    } else {
      setNomeError('')
    }

    const telClean = telefone.replace(/\D/g, '')
    if (!/^\d{10,11}$/.test(telClean)) {
      setTelefoneError('Telefone inválido (ex: 31987654321)')
      valid = false
    } else {
      setTelefoneError('')
    }

    if (!cidade.trim()) {
      setCidadeError('Cidade é obrigatória')
      valid = false
    } else {
      setCidadeError('')
    }

    return valid
  }, [nome, telefone, cidade])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSending) return
    if (!validateForm()) return

    setIsSending(true)
    const telClean = telefone.replace(/\D/g, '')
    const cidadeTrim = cidade.trim()
    const nomeTrim = nome.trim()

    // Abrir WhatsApp imediatamente
    const text = encodeURIComponent(
      `Olá! Sou ${nomeTrim}. Quero fazer uma simulação de empréstimo. Moro em ${cidadeTrim} e meu telefone é ${telClean}`
    )
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${text}&type=phone_number&app_absent=0`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    // Tracking — evento Contact (padrão Meta) para Pixel + N8N
    const tracking = getTrackingManager()
    if (tracking) {
      await tracking.trackContact(cidadeTrim, telClean, '', nomeTrim)
    }

    setIsSending(false)
  }

  const isFormValid =
    nome.trim().length > 0 &&
    /^\d{10,11}$/.test(telefone.replace(/\D/g, '')) &&
    cidade.trim().length > 0

  return (
    <div className="page">
      <main className="card">
        <div className="badge">
          <i className="fa-solid fa-shield-halved"></i>
          SIMULAÇÃO GRATUITA E SEGURA
        </div>

        <h1>Precisa de crédito?<br />Simule agora pelo WhatsApp</h1>

        <p className="subtitle">
          Preencha seus dados abaixo e fale direto com nosso especialista. Sem burocracia, sem fila.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              type="text"
              className={nomeError ? 'input-error' : ''}
              placeholder="Ex: Daniel"
              value={nome}
              onChange={(e) => { setNome(e.target.value); setNomeError('') }}
            />
            {nomeError && <span className="error-message">{nomeError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Seu telefone <span className="required">*</span></label>
            <input
              id="telefone"
              type="tel"
              className={telefoneError ? 'input-error' : ''}
              placeholder="Ex: 31987654321"
              value={telefone}
              onChange={(e) => { setTelefone(e.target.value); setTelefoneError('') }}
            />
            {telefoneError && <span className="error-message">{telefoneError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade onde mora</label>
            <input
              id="cidade"
              type="text"
              className={cidadeError ? 'input-error' : ''}
              placeholder="Ex: Betim"
              value={cidade}
              onChange={(e) => { setCidade(e.target.value); setCidadeError('') }}
            />
            {cidadeError && <span className="error-message">{cidadeError}</span>}
          </div>

          <button
            type="submit"
            className={`btn-whatsapp ${isFormValid ? '' : 'btn-disabled'}`}
            disabled={!isFormValid || isSending}
          >
            <i className="fa-brands fa-whatsapp"></i>
            {isSending ? 'Redirecionando...' : 'Chamar no WhatsApp'}
          </button>
        </form>

        <div className="trust">
          <i className="fa-solid fa-lock"></i>
          Seus dados estão protegidos e não serão compartilhados.
        </div>
      </main>

      <footer className="footer">
        © 2026 Crédito online seguro. Todos os direitos reservados.
      </footer>
    </div>
  )
}
