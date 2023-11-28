import React from 'react'
import background from '../../../assets/background-barbearia.jpeg'
import logo from '../../../assets/logo.png'
import '../index.scss'
import Maps from './maps'
import Footer from '../../../components/Footer'
import Schedule from './schedule'
import store from '../../../store/home-store'
import CarrouselComponent from './carrousel'
import CountdownTimer from '../../Cronometro'
import sinoa from '../../../assets/sinoa.png'
import topnatal from '../../../assets/topo.png'

interface IProps {
  changeMenu: (menu) => void
}

const Home:React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const {showSchedule,setShowSchedule} = store()
  return (
    <div>
      <section className="background"> 
      <img className='topo' src={topnatal} alt=""/>
      <img className='sinoleft' src={sinoa} alt=""/>
      <img className='sinoright'src={sinoa} alt=""/>
        <img className="background" src={background} alt=""/>
        <img className = "logo" src={logo} alt=""/>
      </section>
      <section className="schedule-time">
        <span className="title">CAVERNA BARBEARIA</span>
        <span className = "sub-title">AGENDE SEU HORÁRIO AQUI</span>
        <button onClick={() => setShowSchedule(true)}>AGENDAR HORÁRIO</button>
      </section>
      <section>
        <CountdownTimer/>
      {!showSchedule && <CarrouselComponent/>}
      {!showSchedule && <Maps/>}


      </section>
      <section>
       <Footer/>
      </section>

      <aside>
        {showSchedule && <Schedule changeMenu = {(menu) => {
          changeMenu(menu)
        }}/>}
      </aside>
    </div>
  )
}

export default Home