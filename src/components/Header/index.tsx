import React from 'react'
import clockImage from '../../assets/clock.png'
import returnImage from '../../assets/icons/return.svg'

import userImage from '../../assets/icons/user.svg'

import './index.scss'

interface IProps {
  changeMenu: (value) => void,
  menu: 'my-account' | 'home'
}
const Header:React.FunctionComponent<IProps> = ({
  changeMenu,
  menu
}) => {
  return (
    <div className="header">
     {menu === 'home' && <div className='title'>
        <img src={clockImage} alt="" width="20px" height="20px"/>
        <span>Aberto de Seg. a Sáb. das 8h as 19h</span>
      </div>}
      {menu === 'my-account' &&<div className='title' onClick={() => changeMenu('home')}>
        <img src={returnImage} alt="" width="20px" height="20px"/>
        <span>Voltar para home</span>
      </div>}
      {menu === 'home' &&<div className='title' onClick={() => changeMenu('my-account')}>
        <img src={userImage} alt="" width="20px" height="20px"/>
        <span>Minha Conta</span>
      </div>}

      {menu === 'my-account' &&<div className='title' onClick={() => changeMenu('home')}>
        <img src={clockImage} alt="" width="20px" height="20px"/>
        <span>Agendar Horário</span>
      </div>}
    
    </div>
  )
}

export default Header