import React from 'react'

interface IProps {
  schedules: any,
  openModalConfirm: (open) => void
}

const sortSchedules = (items) => {
  return [...items].sort((a, b) => {
    if (+a.hour.split(':')[0] === +b.hour.split(':')[0]) {
      return +a.hour.split(':')[1] - +b.hour.split(':')[1]
    }
    return +a.hour.split(':')[0] - +b.hour.split(':')[0]
  })
}

const isRealized = (item) => {
  const partesData = item.date.split('/')
  const data = new Date(+partesData[2], +partesData[1] - 1, +partesData[0])
  const hour = item.hour.split(':')
  data.setHours(hour[0], hour[1], hour[2])
  return data < new Date()
}

const Schedules: React.FunctionComponent<IProps> = ({
  schedules,
  openModalConfirm
}) => {
  if (!schedules || !schedules.length) {
    return <p className="profile-empty">Nenhum agendamento encontrado.</p>
  }

  return (
    <div className="profile-bookings">
      {sortSchedules(schedules).map((item) => {
        const realized = isRealized(item)
        return (
          <article className="profile-booking" key={item._id}>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6" cy="6" r="2.5" />
                <circle cx="6" cy="18" r="2.5" />
                <path d="M8.2 7.8L20 18M8.2 16.2L20 6" />
              </svg>
            </span>
            <div className="profile-booking__info">
              <strong>{item.typeCut.title}</strong>
              <small>{item.date} · {item.hour}</small>
              <small>{item.user.name} · {item.user.phone}</small>
              <small>ID: {item._id}</small>
              <small>Cadastro: {item.dateRegister}</small>
              {item.typeCut?.price && <b>{item.typeCut.price}</b>}
            </div>
            <button
              type="button"
              className="profile-booking__action"
              style={{ background: realized ? 'green' : '#f71d1d' }}
              onClick={() => {
                if (!realized) openModalConfirm(item._id)
              }}
            >
              {realized ? 'Realizado' : 'Cancelar'}
            </button>
          </article>
        )
      })}
    </div>
  )
}

export default Schedules
