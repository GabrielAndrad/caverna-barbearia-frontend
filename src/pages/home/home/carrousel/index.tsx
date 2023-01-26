import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import './index.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import corte1 from '../../../../assets/carrousel/corte-1.jpeg'
import corte2 from '../../../../assets/carrousel/corte-2.jpeg'
import corte3 from '../../../../assets/carrousel/corte-3.jpeg'
import corte4 from '../../../../assets/carrousel/corte-4.jpeg'
import corte5 from '../../../../assets/carrousel/corte-5.jpeg'
import sinuca from '../../../../assets/carrousel/sinuca.jpeg'
// import video1 from '../../../../assets/carrousel/video-1.mp4'
// import video2 from '../../../../assets/carrousel/video-2.mp4'
// import video3 from '../../../../assets/carrousel/video-3.mp4'
// import video4 from '../../../../assets/carrousel/video-4.mp4'
// import video5 from '../../../../assets/carrousel/video-5.mp4'

const CarrouselComponent = () => {
  return (
    <div  className="carrousel-container">
        <Carousel showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true} interval={10000} autoPlay={true}>
            <img src={corte1} alt=""/>
            <img src={corte2} alt=""/>
            <img src={sinuca} alt=""/>
            <img src={corte3} alt="" />
            <img src={corte4} alt="" />
            <img src={corte5} alt="" />
            {/* <video src={video1} autoPlay={true} controls={true} loop={true}></video>
            <video src={video2} autoPlay={true} controls={true} loop={true}></video>
            <video src={video3} autoPlay={true} controls={true} loop={true}></video>
            <video src={video4} autoPlay={true} controls={true} loop={true}></video>
            <video src={video5} autoPlay={true} controls={true} loop={true}></video> */}

        </Carousel>
    </div>
  
    )
}


export default CarrouselComponent