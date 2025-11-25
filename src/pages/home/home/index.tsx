import React from 'react'
import background from '../../../assets/background-barbearia.jpeg'
import logo from '../../../assets/logo.png'
// import logoNatal from '../../../assets/NatalLogo.png'
import '../index.scss'
import Maps from './maps'
import Footer from '../../../components/Footer'
import Schedule from './schedule'
import store from '../../../store/home-store'
import CarrouselComponent from './carrousel'
// import CountdownTimer from '../../Cronometro'
// import topnatal from '../../../assets/bordanatal.png'
// import sinoa from '../../../assets/sinoa.png'
interface IProps {
  changeMenu: (menu) => void
}

// const Snowflakes: React.FC = () => {
//   const snowflakes = Array.from({ length: 50 }, (_, i) => i);
  
//   return (
//     <div className="snowflakes-container">
//       {snowflakes.map((flake) => (
//         <div
//           key={flake}
//           className="snowflake"
//           style={{
//             left: `${Math.random() * 100}%`,
//             animationDuration: `${Math.random() * 8 + 8}s`,
//             animationDelay: `${Math.random() * 8}s`,
//             opacity: Math.random() * 0.6 + 0.4,
//             fontSize: `${Math.random() * 10 + 10}px`
//           }}
//         >
//           ❄
//         </div>
//       ))}
//     </div>
//   );
// };

const Home:React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const {showSchedule,setShowSchedule} = store()
  return (
    <div>
      {/* <Snowflakes /> */}
      <section className="background"> 
      {/* <img className='topo' src={topnatal} alt=""/>
      // <img className='sinoleft' src={sinoa} alt=""/>
      // <img className='sinoright'src={sinoa} alt=""/> */}
        <img className="background" src={background} alt=""/>
        <img className = "logo" src={logo} alt=""/>
        {/* <img className = "logo-natal" src={logoNatal} alt=""/> */}
      </section>
      <section className="schedule-time">
        <span className="title">CAVERNA BARBEARIA</span>
        <span className = "sub-title">AGENDE SEU HORÁRIO AQUI</span>
        <button onClick={() => setShowSchedule(true)}>AGENDAR HORÁRIO</button>
      </section>
      <section>
        {/* <CountdownTimer/> */}
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