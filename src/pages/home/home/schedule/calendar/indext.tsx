import React, { useState } from 'react';
import Calendar from 'react-calendar';
import store from '../../../../../store/schedule-store';
import './index.scss'

interface Iprops {
  selectDate: (event) => void
}

// Bloqueio temporário: altere para false quando dezembro voltar a abrir.
const BLOCK_DECEMBER = true

const CalendarDate:React.FunctionComponent<Iprops> = ({ selectDate }) => {
  const { getHours } = store()
  const [value, onChange] = useState();
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)

  const onChangeValue = (event) => {
    onChange(event)
    getHours(event)
    selectDate(event)
  }

  return (
    <div className="data-container">
      <Calendar
        onChange={(event) => onChangeValue(event)}
        value={value}
        minDate={new Date()}
        maxDate={maxDate}
        locale="pt-BR"
        tileDisabled={({ date }) => {
          if (BLOCK_DECEMBER && date.getMonth() === 11) {
            return true
          }

          return date.getDay() === 0 || date.getDay() === 1
        }}
      />
    </div>
  )
}

export default CalendarDate
