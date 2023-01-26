import React from 'react'
import './index.scss'

interface IProps {
  openModalConfirm: (open) => void,
  scheduleId:string,
  setShowSchedule:() => void
}

const ModalScheduleEnd:React.FunctionComponent<IProps> = ({
  openModalConfirm,
  scheduleId,
  setShowSchedule
}) => {
  return (
    <div>
      <div className='modal-confirm-background '>
        
      </div>
       <div className="modal-confirm-end">
        <span>Código do agendamento</span>
        <h1 style={{color:'#000'}}>{scheduleId}</h1>
        <span className="line-text-confirm">
          O código do agendamento é utilizado para cancelar o agendamento ou para realizar uma consulta das informações do agendamento na opção Minha Conta. 
          <br/>
        </span>
        <h1 style={{fontSize:12,color:'#000'}}>Tire print ou copie o código para não perde-lo.</h1>

        <div className='modal-confirm-buttons'>
          <button onClick={() => {
             openModalConfirm('')
             setShowSchedule()
          }}>Entendi</button>
        </div>
      </div>
    </div>
  )
}

export default ModalScheduleEnd