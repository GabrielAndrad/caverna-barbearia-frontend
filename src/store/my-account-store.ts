import { getSchedulesByUserApi } from './../services/schedule-service';
import create  from 'zustand';

interface initialData  {
  showSchedule:boolean,
  setShowSchedule:(show:boolean) => void,
  getSchedulesByUser:(user:any) => void,
  getSchedulesFilter:(user:any,phone:string) => void,
  schedules:any[],
  isLoading:boolean,
  phoneSelected:string,
  reset:() => void,
  setPhoneSelected:(phone) => void
}
const store = create<initialData>((set) => ({
  showSchedule:false,
  isLoading:false,
  schedules:[],
  phoneSelected:'',
  reset:() => 
  set((state) => ({
    showSchedule:false,
    phoneSelected:'',
    schedules:[]
  })) ,
  setPhoneSelected:(phoneSelected) => {console.log(phoneSelected)
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
      console.log(phone)
      const user = phone + '?search=' + filter.search
      getSchedulesByUserApi(user).subscribe((response) => {
        set((state) => ({
          ...state,
          schedules: response,
          isLoading:false,
          showSchedule:true,
        }))
      },err => {
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
      set((state) => ({
        ...state,
        schedules: err,
        isLoading:false
      }))
    })
   
  }
 
}));


export default store