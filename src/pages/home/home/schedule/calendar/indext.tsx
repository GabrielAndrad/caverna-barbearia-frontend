import React, { useState } from 'react';
import Calendar from 'react-calendar';
import store from '../../../../../store/schedule-store';
import './index.scss'

interface Iprops {
  selectDate: (event) => void
}
const CalendarDate:React.FunctionComponent<Iprops> =({
  selectDate
} ) =>{
  const {getHours} = store()
  const Data = new Date()
  Data.setDate(Data.getDate() + (new Date().getDay()+1))
  const [value, onChange] = useState();
  const onChangeValue = (event) => {
    onChange(event)
    getHours(event)
    selectDate(event)

  }

  const dateF = new Date()
  const dateD = new Date()
  return (
    <div className = "data-container">
      <Calendar 
        onChange={(event) => onChangeValue(event)} 
        value={value} 
        minDate={new Date()} 
        maxDate={new Date(dateD.setDate(dateF.getDate() + 30))}
        locale={'pt-BR'}
        tileDisabled={(date) => (
          // date.date.getDate() === 23 || date.date.getDate() === 22 || date.date.getDate() === 24 || date.date.getDate() === 29?false:
          (date.date.getDay() === 0) || date.date.getDay() === 1
          // (date.date.getMonth() === 11 && (date.date.getDate() >= 15 && date.date.getDate() <= 31))
        )
            
      
        }
      />
    </div>
    
  );
}

export default CalendarDate