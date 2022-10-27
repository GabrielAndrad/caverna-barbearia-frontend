import { plug } from 'luffie'
import React, { useState } from 'react'
import { map } from 'rxjs/operators'
import Header from '../../components/Header'
import { HomeStore, setShowSchedule } from '../../store/home-store'
import background from '../../assets/background-barbearia.jpeg'
import logo from '../../assets/logo.png'
import './index.scss'
import Maps from './maps'
import Footer from '../../components/Footer'
import Schedule from '../schedule'
import {combineLatest} from 'rxjs'
const Home = ({
  showSchedule
}) => {
  console.log(showSchedule)
  return (
    <main>
      <Header/>
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
    </main>
  )
}


const stream = (props: any) => {
  
  return combineLatest([
    HomeStore,
  ]).pipe(
    map(([databasePlansState]) => {
      return {
        ...databasePlansState,
      };
    })
  );
};

const HomeScreen = plug(stream)(Home);



export default HomeScreen