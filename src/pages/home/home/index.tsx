import React from 'react'
import background from '../../../assets/background-barbearia.jpeg'
import logo from '../../../assets/logo.png'
import '../index.scss'
import Maps from './maps'
import Footer from '../../../components/Footer'
import Schedule from './schedule'
import { setShowSchedule } from '../../../store/home-store'


const Home = ({
  showSchedule
}) => {
  return (
    <div>
      <section className="background"> 
        <img className="background" src={background} alt=""/>
        <img className = "logo" src={logo} alt=""/>
      </section>
      <section className="schedule-time">
        <span className="title">CAVERNA BARBEARIA</span>
        <span className = "sub-title">AGENDE SEU HORÁRIO AQUI</span>
        <button onClick={() => setShowSchedule(true)}>AGENDAR HORÁRIO</button>
      </section>
      <section>
        <Maps/>
      </section>
      <section>
       <Footer/>
      </section>

      <aside>
        {showSchedule && <Schedule/>}
      </aside>
    </div>
  )
}

export default Home