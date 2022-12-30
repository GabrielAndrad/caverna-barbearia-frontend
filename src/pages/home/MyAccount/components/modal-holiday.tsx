import React, { useState } from 'react'
import { getHoursByDate, saveholiday } from '../../../../services/schedule-service'

interface IProps {
  setModalHolidays: (open) => void,
}
const ModalHoliday:React.FunctionComponent<IProps> = ({
  setModalHolidays
}) => {
  const [dateHoliday,setDateHoliday] = useState('')
  const [rangeHoliday,setRangeHoliday] = useState({inicio:'09:00:00',fim:'18:00:00'})
  const [hours,setHours] = useState([])
  return (
    <div>
      <div className="modal-confirm-range" style={{height:'40vh'}}>
        <span>Selecione uma data parar marcar como folga.</span>
        <input 
              onChange = {(event:any) => {
                getHoursByDate(event.target.value)
                .subscribe((response) => {
                  setHours(response)
                })
                setDateHoliday(event.target.value)}
              } 
              type="date" 
              className="input-text" 
              value={dateHoliday}
        />
        <div className="range">
          <span>Selecione um período deste dia.</span>
          <div className="range-inputs">
          <select 
            value={rangeHoliday.inicio}
            onChange = {(event:any) => setRangeHoliday({...rangeHoliday,inicio:event.target.value})}
            placeholder='Fim'
            className="input-text" 
          >
            {hours.map((el) => {
              return(
                <option style={{background:'#fff',color:'#000'}}>{el.value}</option>
              )
            })}
          </select>
        <select 
          onChange = {(event:any) => setRangeHoliday({...rangeHoliday,fim:event.target.value})}
          value={rangeHoliday.fim}
          placeholder='Fim'
          className="input-text" 
          >
            {hours.map((el) => {
              return(
                <option>{el.value}</option>
              )
            })}
          </select>
          </div>
        </div>
        <div className='modal-confirm-buttons'>
          <button 
            style={{background:'#fff',color:'#000',border:'1px solid #000'}}
            onClick={() => {
            setModalHolidays(false)
          }}>Cancelar</button>
          <button onClick={() => {
              console.log(rangeHoliday,dateHoliday)
            const params = {
              inicio: rangeHoliday.inicio,
              fim:rangeHoliday.fim,
              date: dateHoliday
            }
             saveholiday(params)
             .subscribe()
             setModalHolidays(false)

          }}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalHoliday