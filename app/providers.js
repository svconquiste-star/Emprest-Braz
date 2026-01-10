'use client'

import { CityProvider } from '../context/CityContext'

export function Providers({ children }) {
  return (
    <CityProvider>
      {children}
    </CityProvider>
  )
}
