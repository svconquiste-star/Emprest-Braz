'use client'

import { useEffect } from 'react'
import Hero from '../components/Hero'
import CitySelector from '../components/CitySelector'
import WhatsAppButton from '../components/WhatsAppButton'
import Benefits from '../components/Benefits'
import Steps from '../components/Steps'
import Proof from '../components/Proof'
import FAQ from '../components/FAQ'
import { getTrackingManager } from '../lib/tracking'

export default function Home() {
  useEffect(() => {
    const tracking = getTrackingManager()
    if (tracking) {
      tracking.trackViewContent()
    }
  }, [])

  return (
    <main className="shell">
      <div className="content">
        <div className="hero-city-section">
          <Hero />
          <CitySelector />
        </div>
        <WhatsAppButton />
        <Benefits />
        <Steps />
        <Proof />
        <FAQ />
      </div>
    </main>
  )
}
