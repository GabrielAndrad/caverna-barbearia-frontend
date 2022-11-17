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
import store from '../../../../store/my-account-store'
interface IProps {
  changeMenu:(menu) => void
}


const Schedule:React.FunctionComponent<IProps> = ({
  changeMenu
}) => {
  const {setShowSchedule} = storeHome()
  const {setLoading,isLoading,hoursSelected} = storeSchedule()
  const [details,setShowDetails] = useState([])
  const [typeSelected,setTypeSelected] = useState({
    title: '',
    value:''
  })
  const [selectDate,onChangeSelectDate] = useState()
  const [scheduleSelected,setScheduleSelected] = useState<any>({user:{name:'',phone:''}})
  const [steps,setStep] = useState('infos') 
  const {setPhoneSelected,getSchedulesByUser} = store()

  const scheduleTypes = [{
    id:1,
    name:'CABELO',
    details:[{
      title:"Corte na Máquina",
      value: 'R$ 20,00'
    },{
      title:'Corte Social',
      value:'R$ 25,00'
    },{
      title:'Corte Degradê',
      value:'R$ 30,00'
    }]
  },{
    id:2,
    name:'BARBA',
    details:[{
      title:'Barba',
      value:'R$ 20.00'
    }]
  },{
    id:3,
    name:'SOBRANCELHA',
    details:[
      {title:'Sobrancelha',value:'R$ 10,00'}
    ]
  },{
    id:4,
    name:'COMBOS',
    details: [
      {title:'Corte + Sobrancelha',value:'R$ 30,00'},
      {title:'Corte + Barba',value:'R$ 40,00'},
      {title:'Corte + Barba + Sobrancelha',value:'R$ 60,00'},

    ]
  }]

  const handleDetails = (item) => {
    setTypeSelected(item)
  }

  const handleTypes = (item) => {
    setShowDetails(item.details)

  }

  const handleSelectHours = (item) => {
    if(!!typeSelected && selectDate){
      setScheduleSelected({
        typeCut: {
          title:typeSelected.title,
          price:typeSelected.value
        },
        dateRegister:moment(new Date()).format('DD/MM/YYYY'),
        hour: item.value,
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
        if(!!scheduleSelected){
          setScheduleSelected(undefined)
        } else {
          if(typeSelected){
            setTypeSelected({title:'',value:''})
            setShowDetails([])
            onChangeSelectDate(undefined)

          }
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
      setTimeout(() => {
        setShowSchedule(false)
        setPhoneSelected(scheduleSelected.user.phone)
        getSchedulesByUser(scheduleSelected.user.phone)
        changeMenu('my-account')
      },3000)


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
        return !scheduleSelected.user || !scheduleSelected.user.phone || !scheduleSelected.user.name
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
    <div className="schedule">
        <ToastContainer/>
        <span className="icon-close" onClick={() => setShowSchedule(false)}>x</span>
        <span 
        onClick={returnStep}
        style={{position:'absolute',left:10,top:10,display:'flex',alignItems:'center',cursor:'pointer'}}> 
        <img alt = "" src={returnImage} style={{width:20,height:20}}/> 
        Voltar
        </span>
      {steps === 'infos' && (
        <div>
             {!typeSelected.title ?<h1>Selecione o Serviço</h1>:<h1>Selecione uma data disponível</h1>}
       

       {!typeSelected.title && <ul className="schedule-list">
         {details.length > 0?(
           details.map((item,index) => {
             return(
             <li  key = {index} onClick={() => handleDetails(item)} className="schedule-list-item" style={{justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:"center"}}>
                <img src={img} alt=""/>
               <span>{item.title}</span>
              </div>
            
               <span>{item.value}</span>
              </li>
             )
           })
         ):(
           scheduleTypes.map((item) => {
             return(
             <li  key = {item.id} onClick={() => handleTypes(item)} className="schedule-list-item">
               <img src={img} alt=""/>
               <span>{item.name}</span>

               </li>
             )
           })
           )
       }
     </ul>}
     {typeSelected.title && <CalendarDate selectDate = {(event) => onChangeSelectDate(event)}/>}
     {typeSelected.title && <h1>Selecione um horário disponível para a data selecionada</h1>}
     {typeSelected.title &&  
     <div className="list-container">
       <div className="list-hours">
       { hoursSelected.map((el) => {
           return (
             <div 
             onClick={(event) => {
              !el.disabled?handleSelectHours(el):
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
               backgroundColor:el.disabled?'#ddd':el.value === scheduleSelected?.hour?'#1087ff':'#fff',
               color:el.disabled?'#fff':el.value === scheduleSelected?.hour?'#fff':'#000'}} key = {el.value}>
            {!isLoading &&<span>{el.value.replace(':00','')}</span> }
            </div>
           )
         })}
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
            <button className="save-schedule" onClick={() =>saveSchedule()}>
             {isLoading && <LoadingSpinner/>} Salvar Agendamento
              </button>
          </div>
          }
        </div>
      )}
      {steps === 'user' && (
        <div className="form-user">
          <h1>Preencha seus dados</h1>
          <div className="line-button" style={{height:'5vh'}}>
            <input 
              onChange = {(event:any) => handleUser('name',event.target.value)} 
              type="text" 
              className="input-text" 
              placeholder="Digite seu nome"/>
          </div>
          <div className="line-button" style={{height:'5vh'}}>
          
              <InputMask mask="(99)99999-9999" maskChar={null} className = "input-text"
              placeholder = "Digite seu whatsapp"
              onChange={onChange} beforeMaskedValueChange={beforeMaskedValueChange} />
          </div>
          
          {scheduleSelected && 
          <div className="line-button">
            
            <button disabled={handleDisabled('user')} className="save-schedule" onClick={() =>{
              nextStep('review')
            }}>Continuar</button>

          </div>
          }
        </div>
      )}

       
       
        
    </div>
  )
}

export default Schedule