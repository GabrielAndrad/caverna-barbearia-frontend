
import React from 'react'
import './index.scss'
import tijolo from '../../../../assets/tijolo.jpeg'
const Maps = () => {
  
  return (
    <div className="map-container">
        <img src={tijolo} alt=""/>
        <iframe title="maps" style={{borderRadius:12}}width="100%" height="300" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} 
        id="gmap_canvas" 
        src="https://maps.google.com/maps?width=100%&amp;height=400&amp;hl=en&amp;q=90%20Rua%20Benedito%20de%20Campos%20Sorocaba+()&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
    </div>
  )
}

export default Maps