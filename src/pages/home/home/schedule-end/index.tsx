import React from 'react'
import './index.scss'

interface IProps {
  openModalConfirm: (open) => void,
  scheduleId: string,
  setShowSchedule: () => void,
  scheduleSelected?: any
}

const ModalScheduleEnd: React.FunctionComponent<IProps> = ({
  openModalConfirm,
  scheduleId,
  setShowSchedule,
  scheduleSelected
}) => {
  return (
    <section className="screen confirmed-screen">
      <div className="confirmed-check">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 4.5-4.5 1.4 1.4-5.9 5.9z" />
        </svg>
      </div>
      <h2>Agendamento confirmado!</h2>
      <p className="confirmed-message">
        O código serve para cancelar ou consultar o horário em Minha Conta. Tire print ou copie para não perdê-lo.
      </p>
      <div className="confirmed-card">
        <strong>{scheduleId}</strong>
        <span>{scheduleSelected?.typeCut?.title}</span>
        <span>{scheduleSelected?.date ? new Date(scheduleSelected.date).toLocaleDateString('pt-BR') : ''} · {scheduleSelected?.hour}</span>
        <b>{scheduleSelected?.typeCut?.price}</b>
      </div>
      <button type="button" className="btn btn--primary btn--block" onClick={() => {
        openModalConfirm('')
        setShowSchedule()
      }}>Entendi</button>
    </section>
  )
}

export default ModalScheduleEnd
