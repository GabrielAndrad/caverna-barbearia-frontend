import create  from 'zustand';
import { getHoursByDate } from '../services/schedule-service';
interface initialData {
  showSchedule:boolean,
  setLoading: (isLoading) => void,
  getHours:(user:any) => void,
  setShowSchedule: (show:boolean) => void,
  hoursSelected:any[]
  isLoading:boolean
}
const store = create<initialData>((set) => ({
  showSchedule:false,
  hoursSelected:[],
  isLoading: false,
  setShowSchedule:(show) => 
    set((state) => ({
      ...state,
      showSchedule:show
    })),
  setLoading: (isLoading) => 
    set((state) => ({
      ...state,
      isLoading
    })),
  getHours:(user) => {
    set((state) => ({
      ...state,
      isLoading: true
    }))
    getHoursByDate(user).subscribe((response) => {
      set((state) => ({
        ...state,
        hoursSelected: response,
        isLoading: false
      }))
    },err => {
      set((state) => ({
        ...state,
        hoursSelected: [],
        isLoading: false
      }))
    })
   
  }
 
}));


export default store