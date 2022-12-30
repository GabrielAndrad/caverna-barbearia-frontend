import { deleteScheduleApi, getSchedulesByUserApi, getInfosApi } from './../services/schedule-service';
import create  from 'zustand';
import { toast } from 'react-toastify';

interface initialData  {
  showSchedule:boolean,
  setShowSchedule:(show:boolean) => void,
  getSchedulesByUser:(user:any) => void,
  getSchedulesFilter:(user:any,phone:string) => void,
  deleteSchedule:(id:string,phone:string,filter:any) => void,
  schedules:any[],
  isLoading:boolean,
  phoneSelected:string,
  reset:() => void,
  getInfos:(filter) => void,
  infos:any,
  setPhoneSelected:(phone) => void
}
const store = create<initialData>((set) => ({
  showSchedule:false,
  isLoading:false,
  schedules:[],
  phoneSelected:'',
  infos:{},
  getInfos: (filter) => {
    
    getInfosApi(filter)
    .subscribe((response) => {
      set((state) => ({
        infos:response,
      }))
    })
  },
  reset:() => 
  set((state) => ({
    showSchedule:false,
    phoneSelected:'',
    schedules:[]
  })) ,
  deleteSchedule:(id,phone,filter) => {
    set((state) => ({
      ...state,
      isLoading: true
    }))
  
     deleteScheduleApi(id)
    .subscribe(() => {
      toast.success('Agendamento excluido com sucesso!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });  
        const user = phone + '?search=' + filter.search + '&inicio=' + filter.inicio + '&fim=' + filter.fim

      getSchedulesByUserApi(user).subscribe((response) => {
        set((state) => ({
          ...state,
          schedules: response,
          isLoading:false,
          showSchedule:true
        }))
      },err => {
        set((state) => ({
          ...state,
          schedules: err,
          isLoading:false
        }))
      })
    })
  },
  setPhoneSelected:(phoneSelected) => {
  set((state) => ({
    ...state,
    phoneSelected
  }))},
  setShowSchedule: (show) => 
    set((state) => ({
      ...state,
      showSchedule:show
    })),
    getSchedulesFilter:(filter,phone) => {
      set((state) => ({
        ...state,
        isLoading: true
      }))
      const user = phone + '?search=' + filter.search + '&inicio=' + filter.inicio + '&fim=' + filter.fim
      getSchedulesByUserApi(user).subscribe((response) => {
        set((state) => ({
          ...state,
          schedules: response,
          isLoading:false,
          showSchedule:true,
        }))
      },err => {
        console.log(err)
        toast.error('Não existem agendamento para este telefone!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });  
        set((state) => ({
          ...state,
          schedules: err,
          isLoading:false
        }))
      })
     
    },
  getSchedulesByUser:(user) => {
    set((state) => ({
      ...state,
      isLoading: true
    }))
    getSchedulesByUserApi(user).subscribe((response) => {
      set((state) => ({
        ...state,
        schedules: response,
        isLoading:false,
        showSchedule:true
      }))
    },err => {
      console.log(err)
      toast.error('Não existem agendamento para este telefone!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });  
      set((state) => ({
        ...state,
        schedules: err,
        isLoading:false
      }))
    })
   
  }
 
}));


export default store