import React, { useState, useEffect } from 'react';
import '../Cronometro/idex.scss';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const deadline = new Date('december 10, 2023 12:00:00').getTime();
    const currentTime = new Date().getTime();
    const difference = deadline - currentTime;

    if (difference <= 0) {
      // Caso a data já tenha passado
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
if(timeRemaining.days===0 && timeRemaining.hours===0 && timeRemaining.minutes===0 && timeRemaining.seconds===0){
  return(
    <div style={{width:'100%',background:'#000',marginTop:-30,paddingBottom:20}}>
    <div className='cronometrocontainer'>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
        <span  style={{marginTop:10}} className='font'>AGENDA DE NATAL E ANO NOVO:</span>
        <h1 className='texto-piscante' style={{margin:10,fontSize:40}}>LIBERADA!!</h1>
    </div>
    </div>
  </div>
    
  )
}
  return (
    <div style={{width:'100%',background:'#000',marginTop:-30,paddingBottom:20}}>
      <div className='cronometrocontainer'>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
          <span className='texto-piscante' style={{fontSize:30}}>ATENÇÃO!!</span>
          <span  style={{marginTop:10,textAlign:'center'}} className='font'>AGENDA DE NATAL E ANO NOVO LIBERADA A PARTIR DE:</span>
      </div>
      <div className="cronometro">
        <div className="item">
      <div className="circulo">
        <span className="numero" id="dias">{timeRemaining.days}</span>
      </div>
      <span className="nome">Dias</span>
        </div>
        <div className="item">
      <div className="circulo">
        <span className="numero" id="horas">{timeRemaining.hours}</span>
      </div>
      <span className="nome">Horas</span>
        </div>
        <div className="item">
      <div className="circulo">
        <span className="numero" id="minutos">{timeRemaining.minutes}</span>
      </div>
      <span className="nome">Minutos</span>
        </div>
        <div className="item">
      <div className="circulo">
        <span className="numero" id="segundos">{timeRemaining.seconds}</span>
      </div>
      <span className="nome">Segundos</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CountdownTimer;