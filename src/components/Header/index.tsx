import React from 'react'
import './index.scss'

interface IProps {
  changeMenu: (value) => void,
  menu: 'my-account' | 'home'
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 2" />
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c.8-3.6 3.2-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
  </svg>
)

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const Header: React.FunctionComponent<IProps> = ({
  changeMenu,
  menu
}) => {
  if (menu === 'my-account') {
    return (
      <header className="topbar account-topbar">
        <button type="button" className="icon-btn" aria-label="Voltar para home" onClick={() => changeMenu('home')}>
          <BackIcon />
        </button>
        <h2 className="page-title">Minha conta</h2>
        <button type="button" className="icon-btn" aria-label="Agendar horário" onClick={() => changeMenu('home')}>
          <ClockIcon />
        </button>
      </header>
    )
  }

  return (
    <header className="landing-header">
      <span className="landing-header__schedule">
        <ClockIcon />
        Aberto de Ter. a Sáb. das 9h às 20h
      </span>
      <button
        className="landing-header__user"
        type="button"
        aria-label="Minha conta"
        onClick={() => changeMenu('my-account')}
      >
        <UserIcon />
      </button>
    </header>
  )
}

export default Header
