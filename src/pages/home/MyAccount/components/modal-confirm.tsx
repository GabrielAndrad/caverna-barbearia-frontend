import React from 'react'
import store from '../../../../store/my-account-store'

interface IProps {
  openModalConfirm: (open) => void,
  modalConfirm: string,
  phoneSelected:string,
  filter:any
}

const ModalConfirm:React.FunctionComponent<IProps> = ({
  openModalConfirm,
  modalConfirm,
  phoneSelected,
  filter
}) => {
  const {deleteSchedule} = store()
  return (
    <div>
       <div className="modal-confirm">
        <span>Tem certeza que deseja cancelar este agendamento?</span>
        <div className='modal-confirm-buttons'>
          <button onClick={() => {
            openModalConfirm('0')
          }}>Cancelar</button>
          <button onClick={() => {
             deleteSchedule(String(modalConfirm),phoneSelected,filter)
             openModalConfirm('0')

          }}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm