import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import img from '../../../../assets/logo.png'
import degradeIcon from '../../../../assets/visual/service-icons/degrade.png'
import degradeBrowIcon from '../../../../assets/visual/service-icons/degrade-sobrancelha.png'
import tradicionalIcon from '../../../../assets/visual/service-icons/tradicional.png'
import tradicionalBrowIcon from '../../../../assets/visual/service-icons/tradicional-sobrancelha.png'
import barbaIcon from '../../../../assets/visual/service-icons/barba.png'
import barbaOzonioIcon from '../../../../assets/visual/service-icons/barba-ozonio.png'
import cabeloBarbaIcon from '../../../../assets/visual/service-icons/cabelo-barba.png'
import comboIcon from '../../../../assets/visual/service-icons/cabelo-barba-sobrancelha.png'
import comboOzonioIcon from '../../../../assets/visual/service-icons/combo-ozonio.png'
import sobrancelhaIcon from '../../../../assets/visual/service-icons/sobrancelha.png'
import pezinhoIcon from '../../../../assets/visual/service-icons/pezinho.png'
import storeSchedule from '../../../../store/schedule-store'
import moment from 'moment'
import LoadingSpinner from '../../../../components/Spinner'
import storeHome from '../../../../store/home-store'
import { getHoursByDate, saveScheduleApi } from '../../../../services/schedule-service'
import { isClosedBookingDate, listBookingDates } from './booking-dates'
import '../../../../../node_modules/react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import ModalScheduleEnd from '../schedule-end'
import { post } from '../../../../services/api'

moment.locale('pt-br');

interface IProps {
  changeMenu:(menu) => void
}


const Schedule:React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const {setShowSchedule} = storeHome()
  const {setLoading,isLoading,hoursSelected,getHours} = storeSchedule()
  const [typeSelected,setTypeSelected] = useState({
    title: '',
    value:'',
    time:1,
    id:0
  })
  const [selectDate,onChangeSelectDate] = useState<any>()
  const [scheduleSelected,setScheduleSelected] = useState<any>({user:{name:'',phone:''}})
  const [steps,setStep] = useState<any>('infos') 
  const [modalEnd,openModalEnd]= useState('')
  const [quickLoading, setQuickLoading] = useState(false)
  const bookingDates = listBookingDates()
  const dateCarouselRef = useRef<HTMLDivElement>(null)
  const scrollDateRef = useRef(false)

  const scheduleTypes = [{
    id: 1,
    title: 'Degradê (1 hora)',
    value: 'R$ 40,00',
    time: 2
  }, {
    id: 2,
    title: 'Degradê e sobrancelha (1 hora)',
    value: 'R$ 45,00',
    time: 2
  }, {
    id: 3,
    title: 'Tradicional (30 minutos)',
    value: 'R$ 35,00',
    time: 1
  }, {
    id: 4,
    title: 'Tradicional e sobrancelha (30 minutos)',
    value: 'R$ 40,00',
    time: 1
  }, {
    id: 5,
    title: 'Barba (30 minutos)',
    value: 'R$ 35,00',
    time: 1
  }, {
    id: 6,
    title: 'Barba (com vapor de ozônio) (30 minutos)',
    value: 'R$ 45,00',
    time: 1
  }, {
    id: 7,
    title: 'Cabelo e barba (1 hora)',
    value: 'R$ 70,00',
    time: 2
  }, {
    id: 8,
    title: 'Cabelo, barba e sobrancelha (1 hora)',
    value: 'R$ 75,00',
    time: 2
  }, {
    id: 9,
    title: 'Cabelo, barba e sobrancelha (com vapor de ozônio) (1 hora)',
    value: 'R$ 85,00',
    time: 2
  }, {
    id: 10,
    title: 'Sobrancelha (na Gillette) (30 minutos)',
    value: 'R$ 10,00',
    time: 1
  }, {
    id: 11,
    title: 'Pezinho (30 minutos)',
    value: 'R$ 15,00',
    time: 1
  }]

  const serviceIcons = {
    1: degradeIcon,
    2: degradeBrowIcon,
    3: tradicionalIcon,
    4: tradicionalBrowIcon,
    5: barbaIcon,
    6: barbaOzonioIcon,
    7: cabeloBarbaIcon,
    8: comboIcon,
    9: comboOzonioIcon,
    10: sobrancelhaIcon,
    11: pezinhoIcon
  }

  const handleTypes = (item) => {
    const Data = new Date()
    Data.setDate(Data.getDate() + (new Date().getDay()+1))
    getHours((new Date().getDay() === 0 || new Date().getDay() === 1)? Data:new Date())
    setTypeSelected(item)
  }

  const handleSelectHours = (item) => {
    if(!!typeSelected && selectDate){
      setScheduleSelected({
        typeCut: {
          title:typeSelected.title,
          price:typeSelected.value,
          time:typeSelected.time,
          id: typeSelected.id
        },
        dateRegister:moment(new Date()).format('DD/MM/YYYY'),
        hour: item.value,
        time:item.time,
        date: selectDate,
        user: {
          name:'',
          phone:''
        }
      })
    }
  
  }

  const returnStep = () => {
    if(steps === 'review'){
      setStep('user')
    } else {
      if(steps === 'user'){
        setStep('infos')
      } else {
          if(typeSelected){
            setTypeSelected({title:'',value:'',time:0,id:0})
            onChangeSelectDate(undefined)
        }
      }
    }
  }

  const findQuickSlot = () => {
    const dates = bookingDates.filter((date) => !isClosedBookingDate(date)).slice(0, 15)
    setQuickLoading(true)

    const search = (index) => {
      if (index >= dates.length) {
        setQuickLoading(false)
        toast.error('Nenhum horário disponível no momento!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        return
      }

      getHoursByDate(dates[index]).subscribe((response) => {
        const hours = response || []
        const found = hours.find((el, hourIndex) => {
          const nextDisabled = hours[hourIndex + 1] ? hours[hourIndex + 1].disabled : true
          if (typeSelected.time === 2) return !el.disabled && !nextDisabled
          return !el.disabled
        })

        if (!found) {
          search(index + 1)
          return
        }

        scrollDateRef.current = true
        onChangeSelectDate(dates[index])
        getHours(dates[index])
        setScheduleSelected({
          typeCut: {
            title: typeSelected.title,
            price: typeSelected.value,
            time: typeSelected.time,
            id: typeSelected.id
          },
          dateRegister: moment(new Date()).format('DD/MM/YYYY'),
          hour: found.value,
          time: found.time,
          date: dates[index],
          user: { name: '', phone: '' }
        })
        setQuickLoading(false)
      }, () => search(index + 1))
    }

    search(0)
  }

  useEffect(() => {
    if (!scrollDateRef.current || !dateCarouselRef.current) return
    const carousel = dateCarouselRef.current
    const active = carousel.querySelector('.date-card.is-active') as HTMLElement | null
    if (!active) return
    scrollDateRef.current = false
    const left = active.offsetLeft - (carousel.clientWidth - active.offsetWidth) / 2
    carousel.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [selectDate])

  const handleBack = () => {
    if (steps === 'infos' && !typeSelected.title) {
      setShowSchedule(false)
      return
    }
    returnStep()
  }

  const nextStep = (step) => {
    setStep(step)
  }
  const saveSchedule = () => {
    setLoading(true)
    saveScheduleApi(scheduleSelected)
    .subscribe(response => {
      setLoading(false)
      openModalEnd(response.scheduleModel._id)
      toast.success('Agendamento cadastrado com sucesso!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    },err => {
      setLoading(false)
      console.log(err)
      toast.error('Falha ao salvar agendamento, ' + err.data, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  }

  const handleUser = (type,value) => {
    const selected = scheduleSelected

    selected.user[type] = value
    setScheduleSelected({...selected})

  }

  const handleDisabled = (step) => {

    if(step === 'user'){
      if(scheduleSelected){
        return !scheduleSelected.user || (!scheduleSelected.user.phone || scheduleSelected.user.phone.length !== 14) || !scheduleSelected.user.name
      } else {
        return false
      }
    } else {
      if(step === 'date'){
        if(scheduleSelected){
          return !scheduleSelected.date || !scheduleSelected.hour
        } else {
          return false
        }
      }
    }
   
  }

  const onChange = (event) => {
      handleUser('phone',event.target.value)
  }
 
  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;
 
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

  const backIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )

  const topbar = (title, onBack) => (
    <header className="topbar">
      <button type="button" className="icon-btn" aria-label="Voltar" onClick={onBack}>{backIcon}</button>
      <h2 className="page-title">{title}</h2>
      <span className="icon-btn" aria-hidden="true" />
    </header>
  )

  if (modalEnd) {
    return (
      <ModalScheduleEnd
        openModalConfirm={openModalEnd}
        scheduleId={modalEnd}
        setShowSchedule={() => setShowSchedule(false)}
        scheduleSelected={scheduleSelected}
      />
    )
  }

  return(
    <>
      <ToastContainer/>
      {steps === 'infos' && !typeSelected.title && (
        <section className="screen services-screen">
          {topbar('Serviços', handleBack)}
          <p className="services-intro">Escolha o serviço desejado</p>
          <ul className="schedule-list">
            {scheduleTypes.map((item) => (
              <li key={item.id} onClick={() => handleTypes(item)} className="schedule-list-item">
                <div className="schedule-list-item__main">
                  <span className="schedule-list-item__icon">
                    <img src={serviceIcons[item.id] || img} alt="" />
                  </span>
                  <span>{item.title}</span>
                </div>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}

      {steps === 'infos' && !!typeSelected.title && (
        <section className="screen calendar-screen">
          {topbar('Escolha o horário', handleBack)}
          <div className="calendar-service">
            <strong>{typeSelected.title}</strong>
            <small>{typeSelected.value}</small>
          </div>
          <p className="services-intro">Selecione o dia e o horário disponíveis</p>
          <button type="button" className="quick-booking" onClick={findQuickSlot} disabled={quickLoading}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l2.5 2.5" />
            </svg>
            <span>
              <strong>Agendamento rápido</strong>
              <small>clique para Encontrar o horário mais próximo</small>
            </span>
          </button>
          <div className="quick-booking-loading" hidden={!quickLoading}>
            <div className="quick-booking-loading__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6" cy="6" r="2.5" />
                <circle cx="6" cy="18" r="2.5" />
                <path d="M8.2 7.8L20 18M8.2 16.2L20 6" />
              </svg>
            </div>
            <strong>Aguarde</strong>
            <p>Procurando o horário disponível mais próximo...</p>
          </div>
          <div className="date-carousel" ref={dateCarouselRef}>
            {bookingDates.map((date) => {
              const closed = isClosedBookingDate(date)
              const active = !!selectDate && moment(selectDate).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')
              return (
                <button
                  type="button"
                  key={date.toISOString()}
                  className={`date-card ${active ? 'is-active' : ''}`}
                  disabled={closed}
                  onClick={() => {
                    onChangeSelectDate(date)
                    getHours(date)
                  }}
                >
                  <b>{date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}</b>
                  <strong>{date.getDate()}</strong>
                  <small>{date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</small>
                </button>
              )
            })}
          </div>
          <h3 className="section-title section-title--spaced">Horários disponíveis</h3>
          <div className="time-legend">
            <span><i className="time-legend__swatch time-legend__swatch--free" /> Livre</span>
            <span><i className="time-legend__swatch time-legend__swatch--taken" /> Ocupado</span>
            <span><i className="time-legend__swatch time-legend__swatch--selected" /> Selecionado</span>
          </div>
          <div className="time-slots calendar-times">
            {selectDate && hoursSelected.map((el) => {
              const index = hoursSelected.map(hour => hour.value).indexOf(el.value)
              const selected = el.value === scheduleSelected?.hour
              const nextBlocked = hoursSelected[index + 1] ? hoursSelected[index + 1].disabled : true
              const blocked = typeSelected.time === 2
                ? (el.disabled || (!selected && nextBlocked))
                : el.disabled
              return (
                <button
                  type="button"
                  key={el.value}
                  className={`time-chip ${selected && !el.disabled ? 'is-active' : ''} ${blocked ? 'is-disabled' : ''}`}
                  onClick={() => {
                    !el.disabled && !(typeSelected.time === 2 && (hoursSelected[index + 1] ? hoursSelected[index + 1].disabled : true))
                      ? handleSelectHours(el)
                      : toast.error('Este horário não está disponivel no momento!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      })
                  }}
                >
                  {!isLoading && <span>{el.value.replace(':00', '')}</span>}
                </button>
              )
            })}
          </div>
          <footer className="calendar-footer">
            <button
              type="button"
              disabled={handleDisabled('date')}
              className="btn btn--primary calendar-confirm"
              onClick={() => {
                nextStep('user')
                setScheduleSelected(scheduleSelected)
              }}
            >Continuar</button>
          </footer>
        </section>
      )}

      {steps === 'user' && (
        <section className="screen auth-screen">
          {topbar('Seus dados', handleBack)}
          <div className="auth-heading">
            <h3>Preencha seus dados</h3>
            <p>Usaremos o nome e o WhatsApp para identificar o agendamento.</p>
          </div>
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Nome completo
              <input
                maxLength={50}
                onChange={(event: any) => handleUser('name', event.target.value)}
                type="text"
                placeholder="Digite seu nome"
              />
            </label>
            <label>
              Telefone
              <InputMask
                mask="(99)99999-9999"
                maskChar={null}
                placeholder="Digite seu whatsapp"
                onChange={onChange}
                beforeMaskedValueChange={beforeMaskedValueChange}
              />
            </label>
            <button
              type="button"
              disabled={handleDisabled('user')}
              className="btn btn--primary btn--block"
              onClick={() => {
                if (steps === 'user')
                  post(`https://hook.us1.make.com/wkwqejgw51h3j4u3d3ec8cm7yrybbacs`, {
                    phone: scheduleSelected.user.phone
                  }).subscribe((response) => {
                    if (response) {
                      nextStep('review')
                    } else {
                      toast.error('Digite um telefone válido', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      })
                    }
                  }, () => {
                    nextStep('review')
                  })
              }}
            >Continuar</button>
          </form>
        </section>
      )}

      {steps === 'review' && (
        <section className="screen summary-screen">
          {topbar('Resumo', handleBack)}
          <div className="summary-heading">
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 4.5-4.5 1.4 1.4-5.9 5.9z" /></svg>
            </span>
            <h3>Confira seu agendamento</h3>
            <p>Verifique com atenção. Se houver algum erro, volte e altere os dados.</p>
          </div>
          <div className="summary-card">
            <div><small>Serviço</small><strong>{scheduleSelected.typeCut?.title}</strong></div>
            <div><small>Preço</small><strong>{scheduleSelected.typeCut?.price}</strong></div>
            <div><small>Data</small><strong>{scheduleSelected.date ? moment(scheduleSelected.date).format('DD/MM/YYYY') : ''}</strong></div>
            <div><small>Horário</small><strong>{scheduleSelected.hour}</strong></div>
            <div><small>Nome</small><strong>{scheduleSelected.user?.name}</strong></div>
            <div><small>Telefone</small><strong>{scheduleSelected.user?.phone}</strong></div>
          </div>
          <footer className="summary-footer">
            <button type="button" disabled={isLoading} className="btn btn--primary btn--block" onClick={() => saveSchedule()}>
              {isLoading && <LoadingSpinner />} Salvar agendamento
            </button>
            <button type="button" className="btn btn--ghost btn--block" onClick={() => setStep('infos')}>Alterar data ou horário</button>
          </footer>
        </section>
      )}
    </>
  )
}

export default Schedule
