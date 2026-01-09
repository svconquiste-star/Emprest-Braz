'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import Steps from '@/components/Steps'
import Proof from '@/components/Proof'
import FAQ from '@/components/FAQ'
import Modal from '@/components/Modal'

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="shell">
      <div className="content">
        <Hero />
        <main>
          <Benefits />
          <Steps />
          <Proof />
          <FAQ />
        </main>
        <footer>
          <span>© {year} Atendimento via WhatsApp. Todos os direitos reservados.</span>
        </footer>
      </div>
      <Modal />
    </div>
  )
}
