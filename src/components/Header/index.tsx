import React from 'react'
import clockImage from '../../assets/clock.png'
import './index.scss'

const Header = () => {
  return (
    <div className="header">
      <img src={clockImage} alt="" width="20px" height="20px"/>
      <span>Aberto de Segunda a Sábado 8h as 19h</span>
    </div>
  )
}

export default Header