import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import './index.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import corte1 from '../../../../assets/carrousel/corte-1.jpeg'
import corte2 from '../../../../assets/carrousel/corte-2.jpeg'
import sinuca from '../../../../assets/carrousel/sinuca.jpeg'

const CarrouselComponent = () => {

  return (
    <div  className="carrousel-container">
        <Carousel showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true} interval={3000} autoPlay={true}>
             <img src={corte1} alt=""/>
             <img src={corte2} alt=""/>
             <img src={sinuca} alt=""/>
        </Carousel>
    </div>
  
    )
}


export default CarrouselComponent