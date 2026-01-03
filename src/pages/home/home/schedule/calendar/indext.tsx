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

  // Ajuste do período máximo de agendamento para cobrir
  // o cronograma especial de dez/2025 e jan/2026.
  const defaultMaxDate = new Date(dateD.setDate(dateF.getDate() + 30))
  const specialMaxDate = new Date(2026, 0, 12) // 12/01/2026
  // Importante: não podemos "encurtar" o período máximo quando estivermos em jan/2026,
  // senão ficamos sem dias selecionáveis (01-12/01 está fechado).
  // Então usamos sempre o MAIOR entre o limite padrão (hoje + 30 dias) e a data especial.
  const maxDate = defaultMaxDate > specialMaxDate ? defaultMaxDate : specialMaxDate

  return (
    <div className = "data-container">
      <Calendar 
        onChange={(event) => onChangeValue(event)} 
        value={value} 
        minDate={new Date()} 
        maxDate={maxDate}
        locale={'pt-BR'}
        tileDisabled={({ date }) => {
          const year = date.getFullYear();
          const month = date.getMonth(); // 0 = jan, 11 = dez
          const day = date.getDate();

          const isDec2025 = year === 2025 && month === 11;
          const isJan2026 = year === 2026 && month === 0;

          // Regras especiais para DEZEMBRO/2025
          if (isDec2025) {
            // Fechado o dia todo: 25/12 e 31/12
            if ([25, 31].includes(day)) {
              return true;
            }

            // De 16 a 30/12 o cliente pode selecionar qualquer dia,
            // e o backend controla os horários disponíveis conforme as faixas.
            if (day >= 16 && day <= 30) {
              return false;
            }
            // Fora desse intervalo, cai na regra padrão (domingo/segunda)
          }

          // Regras especiais para JANEIRO/2026
          if (isJan2026) {
            // Fechado de 01/01 a 12/01
            if (day >= 1 && day <= 12) {
              return true;
            }
            // A partir de 13/01 segue a regra padrão.
          }

          // Regra padrão: domingo e segunda fechados
          const isSundayOrMonday = date.getDay() === 0 || date.getDay() === 1;
          return isSundayOrMonday;
        }}
      />
    </div>
    
  );
}

export default CalendarDate