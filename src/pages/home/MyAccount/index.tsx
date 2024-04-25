
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
    getInfos,
    infos,
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
  
  return (
    <div className={showSchedule ? 'card-schedule' : 'card-schedule-flex'}>
      {showSchedule && (
        <div className='card-list'>
          <div className='title-line'>
            <h1>Meus Agendamentos {isLoading && <span><LoadingSpinner /></span>}
            {phoneSelected === '12345678910' && <img src={clock} width="20px" height={20}  style={{borderRadius:'50%'}} alt="" onClick={showHolidays} />}
            </h1>
            <span
              style={{ fontWeight: 600, cursor: 'pointer' }}
              onClick={reset}
            >Sair</span>
          </div>
          <div>
            {phoneSelected === '12345678910' && <div className='line-filter' style={{ maxHeight: '5vh', minHeight: '5vh' }}>
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
                onClick={() => {
                  getSchedulesFilter(filter, phoneSelected)
                  getInfos(filter)
                }}
              >Filtrar</button>
              <button
                
                onClick={() => {
                  showData ? openData(false) : openData(true)
                }}
              >{showData ? 'Visualizar Agendamentos' : 'Visualizar Dados'}</button>
            </div>}
          </div>
          <ToastContainer />

          {!showData &&(
            <div>
              <Schedules
                schedules={schedules}
                openModalConfirm={openModalConfirm}
              />
              <ReactTooltip />
            </div>
          )}
        </div>)}

      {!showSchedule && (
        <div className="form-user-acc">
          <h1 style={{ fontSize: 20 }}>Digite seu ID de agendamento</h1>
          <ToastContainer />

          <div className="line-button-acc" style={{ maxHeight: '5vh', minHeight: '5vh' }}>

            <input
              className="input-text-acc"
              placeholder="Digite seu ID de agendamento"
              onChange={handleUser} />
          </div>

          <div className="line-button-acc">

            <button className="save-schedule-acc save-schedule" onClick={() => {
              getSchedulesFilter(filter,phoneSelected)
              if (phoneSelected === '12345678910') getInfos(filter)
            }}>Buscar agendamentos</button>

          </div>
          <span className='forget-id' onClick={ () =>
              window.open(`https://api.whatsapp.com/send?phone=5515997406083&text=${texto}`)
          }>Esqueceu seu ID? Clique aqui.</span>

        </div>
      )}

      {showData &&  phoneSelected === '12345678910' && showSchedule &&(
        <div>
          <Infos infos={infos} filters={filter} />
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
    </div>
  )
}


export default MyAccount