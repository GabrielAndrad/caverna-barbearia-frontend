import React from 'react'
import './index.scss'
import logo from '../../../../assets/visual/logo.png'

const Maps = () => {
  const mapsQuery = 'R.+Dionísio+Reis+dos+Santos,+200,+Jardim+do+Sol,+Sorocaba,+SP,+18017-034'

  return (
    <section className="location-section">
      <h3 className="section-title">Localização</h3>
      <div className="location-card">
        <div className="location-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <div>
          <strong>Caverna Barbearia</strong>
          <p>R. Dionísio Reis dos Santos, 200</p>
          <small>Jardim do Sol · Sorocaba - SP, 18017-034</small>
        </div>
      </div>
      <div className="location-map">
        <iframe
          title="Mapa da Caverna Barbearia"
          src={`https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="location-map__pin" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
      </div>
      <a
        className="location-action"
        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
        target="_blank"
        rel="noreferrer"
      >
        Ver no mapa
      </a>
    </section>
  )
}

export default Maps
