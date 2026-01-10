'use client'

import { createContext, useContext, useState } from 'react'

const CityContext = createContext()

const COVERED_CITIES = [
  'Belo Horizonte',
  'Contagem',
  'Betim',
  'Ribeirão das Neves',
  'Santa Luzia',
  'Divinópolis',
  'Ipatinga',
  'Governador Valadares',
  'Montes Claros',
  'Uberlândia'
]

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(null)
  const [isCityCovered, setIsCityCovered] = useState(false)

  const selectCity = (city) => {
    setSelectedCity(city)
    const covered = COVERED_CITIES.includes(city)
    setIsCityCovered(covered)
  }

  return (
    <CityContext.Provider value={{ selectedCity, isCityCovered, selectCity, COVERED_CITIES }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCityContext() {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCityContext must be used within CityProvider')
  }
  return context
}
