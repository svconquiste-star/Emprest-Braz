'use client'

import { useState } from 'react'
import { useCityContext } from '../context/CityContext'
import CityWarningModal from './CityWarningModal'

export default function CitySelector() {
  const { selectCity, COVERED_CITIES, selectedCity } = useCityContext()
  const [showWarning, setShowWarning] = useState(false)

  const handleCitySelect = (city) => {
    selectCity(city)
  }

  const handleOtherCities = () => {
    setShowWarning(true)
  }

  return (
    <>
      <section className="hero-panel">
        <h3>Selecione sua Cidade</h3>
        <p className="hero-panel-desc">
          Escolha a cidade onde você está para verificar se estamos atendendo na sua região.
        </p>

        <div className="city-buttons">
          {COVERED_CITIES.map((city) => (
            <button
              key={city}
              className={`city-btn ${selectedCity === city ? 'active' : ''}`}
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </button>
          ))}
          <button
            className="city-btn other-cities-btn"
            onClick={handleOtherCities}
          >
            Outras Cidades
          </button>
        </div>

        {selectedCity && (
          <div className={`city-status ${selectedCity ? 'show' : ''}`}>
            <p className="city-status-text">
              Cidade selecionada: <strong>{selectedCity}</strong>
            </p>
          </div>
        )}
      </section>
      {showWarning && <CityWarningModal onClose={() => setShowWarning(false)} />}
    </>
  )
}
