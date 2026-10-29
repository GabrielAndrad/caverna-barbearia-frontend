
import React, { useState } from 'react'
import LoadingSpinner from '../../../components/Spinner'
import store from '../../../store/my-account-store'
import './index.scss'
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import Schedules from './schedules';
import Infos from './infos';
import clock from '../../../assets/clock.png'
import adminAvatar from '../../../assets/visual/admin-avatar.png'
import ModalHoliday from './components/modal-holiday';
import ModalConfirm from './components/modal-confirm';


moment.locale('pt-br');

interface IProps {
  changeMenu: (menu) => void
}
const MyAccount: React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const data = new Date()
  data.setDate(data.getDate() + 7)
  const {
    showSchedule,
    isLoading,
    schedules,
    setPhoneSelected,
    phoneSelected,
    getSchedulesFilter,
    reset } = store()

  const [filter, setFilter] = useState({
    inicio: moment(new Date()).format('YYYY-MM-DD'),
    fim: moment(data).format('YYYY-MM-DD'),
    search: ''
  })

  const [modalConfirm, openModalConfirm] = useState('0')
  const [showData, setShowData] = useState(false)
  const [modalHolidays, setModalHolidays] = useState(false)



  const openData = (open) => {
    setShowData(open)

  }

  const handleUser = (event) => {
    setPhoneSelected(event.target.value)
  }

  const showHolidays = () => {
    setModalHolidays(!modalHolidays)
  }

  const texto = 'Olá, esqueci meu id de agendamento pode me ajudar?'
  
  const backIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )

  return (
    <section className="screen profile-screen">
      <header className="topbar">
        <button type="button" className="icon-btn" aria-label="Voltar para home" onClick={() => changeMenu('home')}>{backIcon}</button>
        <h2 className="page-title">Meu perfil</h2>
        <button type="button" className="icon-btn" aria-label="Agendar horário" onClick={() => changeMenu('home')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
        </button>
      </header>
      {showSchedule && (
        <div className='card-list'>
          <div className="profile-user">
            <span className="profile-user__avatar">
              {phoneSelected === '12345678910'
                ? <img src={adminAvatar} alt="Logo Caverna" />
                : (phoneSelected || 'C').slice(0, 1).toUpperCase()}
            </span>
            <div>
              <h3>Meus agendamentos {isLoading && <LoadingSpinner />}</h3>
              <p>{phoneSelected}</p>
            </div>
            {phoneSelected === '12345678910' && <img src={clock} width="20px" height={20} style={{ borderRadius: '50%', cursor: 'pointer' }} alt="" onClick={showHolidays} />}
          </div>
          <div>
            {phoneSelected === '12345678910' && <div className="auth-form">
              <input
                onChange={(event: any) => setFilter({ ...filter, search: event.target.value })}
                type="text"
                placeholder='Digite um texto para filtrar os agendamentos'
                className="input-text"
              />
              <input
                onChange={(event: any) => setFilter({ ...filter, inicio: event.target.value })}
                type="date"
                className="input-text"
                value={filter.inicio}
              />
              <input
                onChange={(event: any) => setFilter({ ...filter, fim: event.target.value })}
                type="date"
                className="input-text"
                value={filter.fim}
                placeholder="Digite seu telefone" />
              <button
                type="button"
                className="btn btn--primary btn--block"
                onClick={() => {
                  getSchedulesFilter(filter, phoneSelected)
                }}
              >Filtrar</button>
              <button
                type="button"
                className="btn btn--ghost btn--block"
                onClick={() => {
                  showData ? openData(false) : openData(true)
                }}
              >{showData ? 'Visualizar Agendamentos' : 'Visualizar Dados'}</button>
            </div>}
          </div>
          <ToastContainer />

          {!showData &&(
            <div>
              <h3 className="section-title section-title--spaced">Meus agendamentos</h3>
              <Schedules
                schedules={schedules}
                openModalConfirm={openModalConfirm}
              />
              <ReactTooltip />
            </div>
          )}
          <button type="button" className="profile-logout" onClick={reset}>Sair</button>
        </div>)}

      {!showSchedule && (
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <div className="auth-heading">
            <h3>Digite seu ID de agendamento</h3>
            <p>Use o código recebido na confirmação para consultar ou cancelar.</p>
          </div>
          <ToastContainer />
          <label>
            ID de agendamento
            <input
              placeholder="Digite seu ID de agendamento"
              onChange={handleUser}
            />
          </label>
          <button type="button" className="btn btn--primary btn--block" onClick={() => {
            getSchedulesFilter(filter, phoneSelected)
          }}>Buscar agendamentos</button>
          <button type="button" className="auth-create" onClick={() =>
            window.open(`https://api.whatsapp.com/send?phone=5515997406083&text=${texto}`)
          }>Esqueceu seu ID? Clique aqui.</button>
        </form>
      )}

      {showData &&  phoneSelected === '12345678910' && showSchedule &&(
        <div>
          <Infos schedules={schedules} filters={filter} isLoading={isLoading} />
        </div>
      )}


      {(modalConfirm !== '0' || modalHolidays) && <div className='modal-confirm-background'></div>}
      {modalConfirm !== '0' &&
        <ModalConfirm
          phoneSelected={phoneSelected}
          modalConfirm={modalConfirm}
          openModalConfirm={openModalConfirm}
          filter={filter}
        />
      }
      {modalHolidays &&
        <ModalHoliday setModalHolidays={setModalHolidays} />
      }
    </section>
  )
}


export default MyAccount