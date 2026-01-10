'use client'

import { useState } from 'react'
import Hero from '../components/Hero'
import CitySelector from '../components/CitySelector'
import WhatsAppButton from '../components/WhatsAppButton'
import Benefits from '../components/Benefits'
import Steps from '../components/Steps'
import Proof from '../components/Proof'
import FAQ from '../components/FAQ'
import Modal from '../components/Modal'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  return (
    <main className="shell">
      <div className="content">
        <div className="hero-city-section">
          <Hero onContactClick={() => setShowModal(true)} />
          <CitySelector />
        </div>
        <WhatsAppButton />
        <Benefits />
        <Steps />
        <Proof />
        <FAQ />
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </main>
  )
}
