
import React, { useState } from 'react'
import LoadingSpinner from '../../../components/Spinner'
import store from '../../../store/my-account-store'
import './index.scss'
import InputMask from 'react-input-mask';
import canceled from '../../../assets/icons/cancel-icon.svg'
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';

interface IProps {
  changeMenu:(menu) => void
}
const MyAccount:React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const data = new Date()
  data.setDate(data.getDate()+7)
  const {
    showSchedule,
    getSchedulesByUser,
    isLoading,
    schedules,
    setPhoneSelected,
    phoneSelected,
    getSchedulesFilter,
    deleteSchedule,
    reset} = store()
  const [filter,setFilter] = useState({
    inicio:moment(new Date()).format('YYYY-MM-DD'),
    fim:moment(data).format('YYYY-MM-DD'),
    search:''
  })

  const [modalConfirm,openModalConfirm] = useState('0')
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
              placeholder='Digite um texto para filtrar'
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
      <ToastContainer/>
      {schedules && schedules.length && window.screen.width > 700 && <div className='table-schedule'>
        
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
                      <img data-tip="Cancelar agendamento" style={{cursor:'pointer',fontFamily:'poppins'}}src={canceled} alt="" width="30px" height="30px"
                      onClick={() => {
                        openModalConfirm(item._id)
                      }}/>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>}
      {schedules && schedules.length && window.screen.width < 700  && 
        <div className='mobile-table-content'>
          {schedules.map((item,index) => {
            return(
              <div className='mobile-table-row' key={index}>
                <span><b>Usuário:</b> {item.user.name}</span>
                <span><b>Telefone:</b>{item.user.phone}</span>
                <span><b>Tipo do Serviço:</b>{item.typeCut.title}</span>
                <span><b>Preço:</b>{item.typeCut.price}</span>
                <span><b>Data:</b>{item.date}</span>
                <span><b>Hora:</b>{item.hour}</span>
                <span><b>Data Cadastro:</b>{item.dateRegister}</span>
                <span>
                <p  
                onClick={() => {
                  openModalConfirm(item._id)
                 }}
                className="cancel-schedule">
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
         <div className="form-user-acc">
         <h1 style={{fontSize:30}}>Digite seu whatsapp</h1>
         <ToastContainer/>

         <div className="line-button-acc" style={{height:'5vh'}}>
      
             <InputMask mask="(99)99999-9999" maskChar={null} className = "input-text-acc"
             placeholder = "Digite seu whatsapp"
             onChange={handleUser} beforeMaskedValueChange={beforeMaskedValueChange} />
         </div>
         
         <div className="line-button-acc">
           
           <button disabled={phoneSelected.length <14} className="save-schedule-acc save-schedule" onClick={() =>{
            getSchedulesByUser(phoneSelected)
           }}>Buscar agendamentos</button>

         </div>
        </div>
      )}
      {modalConfirm !== '0' && <div className='modal-confirm-background'></div> }
      {modalConfirm !== '0'&&
      <div className="modal-confirm">
        <span>Tem certeza que deseja cancelar este agendamento?</span>
        <div className='modal-confirm-buttons'>
          <button onClick={() => {
            openModalConfirm('0')
          }}>Cancelar</button>
          <button onClick={() => {
             deleteSchedule(String(modalConfirm),phoneSelected)
             openModalConfirm('0')

          }}>Confirmar</button>
        </div>
      </div>}
    </div>
  )
}


export default MyAccount