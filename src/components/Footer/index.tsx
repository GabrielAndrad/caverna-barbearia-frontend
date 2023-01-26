import React from 'react'
import whats from '../../assets/whats.png'
import face from '../../assets/facebook.png'
import insta from '../../assets/instagram.png'
import './index.scss'

const Footer = () => {
  return (
    <div className="footer">  
     <img src={whats} style={{marginRight:'10px'}}onClick={() => {
          const texto = `Olá, tudo bem? Gostaria de tirar algumas duvidas sobre o agendamento.`

          window.open(`https://api.whatsapp.com/send?phone=5515%99189-1072&text=${texto}`)
      }}alt=""/>
      <img src={face} alt=""  onClick={() => {
        window.open('https://www.facebook.com/gabriel.ibanhes.3')
      }}/>
      <img className="insta" src={insta} alt="" onClick={() => {
        window.open('https://www.instagram.com/_capitao_cavernna/')
      }}/>

      <span style={{fontSize:'8px',color:'#fff'}}>GABRIEL DE ANDRADE NUNES CONSULTORIA EM TECNOLOGIA DA INFORMACAO</span>
      </div>
  )
}

export default Footer