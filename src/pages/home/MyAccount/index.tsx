
import React, { useState } from 'react'
import LoadingSpinner from '../../../components/Spinner'
import store from '../../../store/my-account-store'
import './index.scss'
import InputMask from 'react-input-mask';
import canceled from '../../../assets/icons/cancel-icon.svg'
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const MyAccount:React.FunctionComponent = () => {
  const data = new Date()
  data.setDate(data.getDate()+7)
  const {showSchedule,getSchedulesByUser,isLoading,schedules,setPhoneSelected,phoneSelected,getSchedulesFilter,reset} = store()
  const [filter,setFilter] = useState({
    inicio:moment(new Date()).format('YYYY-MM-DD'),
    fim:moment(data).format('YYYY-MM-DD'),
    search:''
  })
  const handleUser = (event) => {
    setPhoneSelected(event.target.value)
  }

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;
    let selection = newState.selection;
    let cursorPosition = selection ? selection.start : null;
 
    // keep minus if entered by user
    if (value.endsWith('-') && userInput !== '-') {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }
 
    return {
      value,
      selection
    };
  }
  console.log(phoneSelected)

  return (
    <div className='card-schedule'>
      {showSchedule && (
      <div className='card-list'>
        <div className='title-line'>
        <h1>Meus Agendamentos {isLoading && <span><LoadingSpinner/></span>} </h1>
        <span 
        style={{fontWeight:600,cursor:'pointer'}}
        onClick={reset}
        >Sair</span>
        </div>
    
      <div>
          <div className='line-filter' style={{height:'5vh'}}>
            <input 
              onChange = {(event:any) => setFilter({...filter,search:event.target.value})} 
              type="text" 
              className="input-text" 
              />
              <input 
              onChange = {(event:any) => setFilter({...filter,inicio:event.target.value})} 
              type="date" 
              className="input-text" 
              value={filter.inicio}
              />
              <input 
              onChange = {(event:any) => setFilter({...filter,fim:event.target.value})} 
              type="date" 
              className="input-text" 
              value={filter.fim}
              placeholder="Digite seu telefone"/>
              <button
              onClick={() => {
                getSchedulesFilter(filter,phoneSelected)
              }}
              >Filtrar</button>
          </div>
      </div>
      <div className='table-schedule'>
        {schedules && schedules.length && window.screen.width > 700 &&
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Tipo do serviço</th>
              <th>Preço</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Data Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
              {schedules.map(item => {
                return(
                  <tr key = {item.id}>
                    <td>{item.user.name}</td>
                    <td>{item.user.phone}</td>
                    <td>{item.typeCut.title}</td>
                    <td>{item.typeCut.price}</td>
                    <td>{item.date}</td>
                    <td>{item.hour}</td>
                    <td>{item.dateRegister}</td>
                    <td>
                      <img data-tip="Cancelar agendamento" style={{cursor:'pointer'}}src={canceled} alt="" width="30px" height="30px"/>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>}
      </div>
      {schedules && schedules.length && window.screen.width < 700  && 
        <div className='mobile-table-content'>
          {schedules.map(item => {
            return(
              <div className='mobile-table-row'>
                <span><b>Usuário:</b> {item.user.name}</span>
                <span><b>Telefone:</b>{item.user.phone}</span>
                <span><b>Tipo do Serviço:</b>{item.typeCut.title}</span>
                <span><b>Preço:</b>{item.typeCut.price}</span>
                <span><b>Data:</b>{item.date}</span>
                <span><b>Hora:</b>{item.hour}</span>
                <span><b>Data Cadastro:</b>{item.dateRegister}</span>
                <span><b>Ações:</b>
                <p className="cancel-schedule">
                  Cancelar
                </p>
                </span>

              </div>
            )
          })
          }
        </div>
        }
      <ReactTooltip />

        </div>)}
      {!showSchedule && (
         <div className="form-user">
         <h1>Digite seu whatsapp</h1>

         <div className="line-button" style={{height:'5vh'}}>
      
             <InputMask mask="(99)99999-9999" maskChar={null} className = "input-text"
             placeholder = "Digite seu whatsapp"
             onChange={handleUser} beforeMaskedValueChange={beforeMaskedValueChange} />
         </div>
         
         <div className="line-button">
           
           <button disabled={phoneSelected.length <14} className="save-schedule" onClick={() =>{
            getSchedulesByUser(phoneSelected)
           }}>Buscar agendamentos</button>

         </div>
        </div>
      )}
    </div>
  )
}


export default MyAccount