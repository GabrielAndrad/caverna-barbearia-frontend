import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getHours } from '../../../store/schedule-store';
import './index.scss'

interface Iprops {
  selectDate: (event) => void
}
const CalendarDate:React.FunctionComponent<Iprops> =({
  selectDate
} ) =>{
  const [value, onChange] = useState(new Date());
  
  const onChangeValue = (event) => {
    onChange(event)
    getHours(event)
    selectDate(event)

  }

  useEffect(() =>{
    getHours(value)
    selectDate(value)
  },[])
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
      tileDisabled={(date) =>date.date.getDay() === 0 }
      />
    </div>
  );
}

export default CalendarDate