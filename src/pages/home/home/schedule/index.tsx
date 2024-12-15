import React, { useState } from 'react'
import './index.scss'
import img from '../../../../assets/logo.png'
import returnImage from '../../../../assets/icons/return.svg'
import CalendarDate from './calendar/indext'
import storeSchedule from '../../../../store/schedule-store'
import moment from 'moment'
import LoadingSpinner from '../../../../components/Spinner'
import storeHome from '../../../../store/home-store'
import { saveScheduleApi } from '../../../../services/schedule-service'
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

  const scheduleTypes = [{
    id:1,
    title:'Degradê (1 hora)',
    value:'R$ 35.00',
    time:2
  },{
    id:2,
    title:'Tradicional (30 min)',
    value:'R$ 30.00',
    time:1 
  },{
    id:3,
    title:'Barba (30 min)',
    value:'R$ 30.00',
    time:1
  },{
    id:4,
    title:'Pezinho (30 min)',
    value:'R$ 15.00',
    time:1
  },{
    id:5,
    title:'Degradê + Barba (1 hora)',
    value:'R$ 60.00',
    time:2
  },{
    id:6,
    title:'Tradicional + Barba (1 hora)',
    value:'R$ 60.00',
    time:2
  }]

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

  return(
    <div style={{zIndex:600}} className="schedule">
        <ToastContainer/>
        <span className="icon-close" onClick={() => setShowSchedule(false)}>x</span>
        <span 
        onClick={returnStep}
        style={{position:'absolute',left:10,top:10,display:'flex',alignItems:'center',cursor:'pointer',paddingRight:'20px',paddingBottom:20,paddingTop:10,textAlign:'center'}}> 
        <img alt = "" src={returnImage} style={{width:20,height:20}}/> 
        Voltar
        </span>
      {steps === 'infos' && (
        <div>
        {!typeSelected.title ?<h1>Selecione o Serviço</h1>:<h1>Selecione uma data disponível</h1>}
       {!typeSelected.title && <ul className="schedule-list">
        {
           scheduleTypes.map((item) => {
             return(
             <li  key = {item.id} onClick={() => handleTypes(item)} className="schedule-list-item" style={{justifyContent:'space-between'}}>
             <div style={{display:'flex',alignItems:"center"}}>
                <img src={img} alt=""/>
               <span>{item.title}</span>
              </div>
               <span>{item.value}</span>
              </li>
             )
           })
        }
     </ul>
     }
     {!typeSelected.title &&           
     <span className="line-text">
       Os tipos de serviços tem diferentes tempos estimados, portanto os horários disponíveis são alterados de acordo com o tempo do serviço.
      </span>
      }
     {typeSelected.title && <CalendarDate selectDate = {(event) => onChangeSelectDate(event)}/>}
     {typeSelected.title && selectDate && <h1 style={{width:'90%',marginLeft:'5%'}}>Selecione um horário disponível para a data selecionada</h1>}
     {typeSelected.title && selectDate &&  
     <div className="list-container">
       <div className="list-hours">
       { hoursSelected.map((el) => {
        const index = hoursSelected.map(hour => hour.value).indexOf(el.value)
          console.log(el.disabled,index,typeSelected,scheduleSelected,hoursSelected) 
          return (
            <div 
             onClick={(event) => {
              !el.disabled && !(typeSelected.time === 2 && (hoursSelected[index+1]?hoursSelected[index+1].disabled:true))?handleSelectHours(el):
              toast.error('Este horário não está disponivel no momento!', {
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
             className = "list-hours-items"
             style={{
               backgroundColor:
               typeSelected.time === 2?
               el.disabled?
               '#000':
               el.value === scheduleSelected?.hour?
               '#1087ff':
               (hoursSelected[index+1]?hoursSelected[index+1].disabled
                :true)?
               '#000':
               el.value === scheduleSelected?.hour?
               '#1087ff':
               '#fff': 
               el.disabled?'#000'
               :el.value === scheduleSelected?.hour?'#1087ff':'#fff',
               color:
               typeSelected.time === 2?
               el.disabled?'#fff':el.value === scheduleSelected?.hour?'#fff': (hoursSelected[index+1]?hoursSelected[index+1].disabled:true)?
               '#fff':el.value === scheduleSelected?.hour?'#fff':'#000': el.disabled?'#fff':el.value === scheduleSelected?.hour?'#fff':'#000'
               }} key = {el.value}>
            {!isLoading &&<span>{el.value.replace(':00','')}</span> }
            </div>

            
           )
         })
         }
         </div>
     </div>
     
     }
      {typeSelected.title && 
          <div className="line-button">
            <button disabled={handleDisabled('date')} className="save-schedule" onClick={() => {
                nextStep('user')
                setScheduleSelected(scheduleSelected)
              }}>Continuar</button>
          </div>
      }
        </div>
      )}
      {steps === 'review' && (
        <div className = "review-container"style={{width:'100%'}}>
          <h1>Revise suas informações:</h1>
            <div className="review">
              <span>Serviço: {scheduleSelected.typeCut.title}</span> 
              <span>Preço: {scheduleSelected.typeCut.price}</span> 
              <span>Data: {moment(scheduleSelected.date).format('DD/MM/YYYY')}</span>
              <span>Horário: {scheduleSelected.hour}</span>
            </div>
          <h1>Informações do cliente:</h1>
          {scheduleSelected.user && <div className="review">
              <span>Nome: {scheduleSelected.user.name}</span> 
              <span>Telefone: {scheduleSelected.user.phone}</span> 
          </div>}

          <span className="line-text">
            Verifique com atenção todas as informações sobre seu agendamento. 
            Se houver algum erro clique no botão voltar e altere seus dados
            </span>
          {scheduleSelected && 
          <div className="line-button">
            <button disabled={isLoading} className="save-schedule" onClick={() =>saveSchedule()}>
             {isLoading && <LoadingSpinner/>} Salvar Agendamento
              </button>
          </div>
          }
        </div>
      )}
      {steps === 'user' && (
        <div className="form-user">
          <h1>Preencha seus dados</h1>
          <div className="line-button" style={{maxHeight:'50px',minHeight:'50px'}}>
            <input 
              maxLength={50}
              onChange = {(event:any) => handleUser('name',event.target.value)} 
              type="text" 
              className="input-text" 
              placeholder="Digite seu nome"
              />
          </div>
          <div className="line-button" style={{maxHeight:'50px',minHeight:'50px'}}>
          
              <InputMask mask="(99)99999-9999" maskChar={null} className = "input-text"
              placeholder = "Digite seu whatsapp"
              onChange={onChange} beforeMaskedValueChange={beforeMaskedValueChange} />
          </div>
          
          {scheduleSelected && 
          <div className="line-button">
            
            <button disabled={handleDisabled('user')} className="save-schedule" onClick={() =>{
              if(steps === 'user')
                post(`https://hook.us1.make.com/wkwqejgw51h3j4u3d3ec8cm7yrybbacs`,{
                     phone:scheduleSelected.user.phone
                   }).subscribe((response) => {
                    if(response){
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

                   },err => {
                    nextStep('review')
                   })
                    
                    
            }}>Continuar</button>

          </div>
          }
          
        </div>
      )}

   {!!modalEnd && <ModalScheduleEnd
    openModalConfirm={openModalEnd}
    scheduleId={modalEnd}
    setShowSchedule={() => setShowSchedule(false)}

    />}
        
    </div>
  )
}

export default Schedule