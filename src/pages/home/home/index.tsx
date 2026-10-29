import React from 'react'
import '../index.scss'
import Maps from './maps'
import Footer from '../../../components/Footer'
import Schedule from './schedule'
import store from '../../../store/home-store'
import CarrouselComponent from './carrousel'
import ambiente from '../../../assets/visual/ambiente.png'

interface IProps {
  changeMenu: (menu) => void
}

const Home: React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const { showSchedule, setShowSchedule } = store()

  if (showSchedule) {
    return (
      <Schedule changeMenu={(menu) => {
        changeMenu(menu)
      }} />
    )
  }

  return (
    <section className="screen landing">
      <header className="landing-header">
        <span className="landing-header__schedule">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
          Aberto de Ter. a Sáb. das 9h às 20h
        </span>
        <button className="landing-header__user" type="button" aria-label="Minha conta" onClick={() => changeMenu('my-account')}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c.8-3.6 3.2-5.5 7.5-5.5s6.7 1.9 7.5 5.5" /></svg>
        </button>
      </header>
      <div className="landing__hero">
        <div className="landing__brand">
          <h1 className="landing__title">CAVERNA <span>BARBEARIA</span></h1>
          <p className="landing__tagline">AGENDE SEU HORÁRIO AQUI</p>
        </div>
        <div className="landing__actions">
          <button type="button" className="btn btn--primary btn--block" onClick={() => setShowSchedule(true)}>
            <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 9h18" /></svg>
            Agendar agora
          </button>
          <button type="button" className="btn btn--ghost btn--block" onClick={() => changeMenu('my-account')}>Sou cliente - entrar</button>
        </div>
      </div>
      <div className="landing__extra">
        <CarrouselComponent />
        <section className="environment-section">
          <h3 className="section-title">Nosso ambiente</h3>
          <img className="environment-image" src={ambiente} alt="Ambiente da Caverna Barbearia" />
        </section>
        <Maps />
        <Footer />
      </div>
    </section>
  )
}

export default Home
