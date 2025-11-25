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
        tileDisabled={({ date }) => {
          const isSundayOrMonday = date.getDay() === 0 || date.getDay() === 1;

          const isDec2025Closed =
            date.getFullYear() === 2025 &&
            date.getMonth() === 11 &&
            [25, 31].includes(date.getDate());

          const isJan2026Closed =
            date.getFullYear() === 2026 &&
            date.getMonth() === 0 &&
            [1, 2, 3, 4, 5, 6].includes(date.getDate());

          return isSundayOrMonday || isDec2025Closed || isJan2026Closed;
        }}
      />
    </div>
    
  );
}

export default CalendarDate