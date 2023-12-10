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
      if(user.getDate() >= 18 && user.getDate() <=22){
        response.push({disabled:false,value:"22:30:00 "})
        response.push({disabled:false,value:"23:00:00 "})
        response.push({disabled:false,value:"23:30:00 "})
        response.push({disabled:false,value:"24:00:00 "})
        response.push({disabled:false,value:"24:30:00 "})
      }
     
      if(user.getDate() >= 23 && user.getDate() <=23){
        response.push({disabled:false,value:"19:00:00 "})
        response.push({disabled:false,value:"19:30:00 "})
        response.push({disabled:false,value:"20:00:00 "})
        response.push({disabled:false,value:"20:30:00 "})
        response.push({disabled:false,value:"21:00:00 "})
        response.push({disabled:false,value:"21:30:00 "})
        response.push({disabled:false,value:"22:00:00 "})
        response.push({disabled:false,value:"22:30:00 "})
      }

      set((state) => ({
        ...state,
        hoursSelected: response.map((el) => {
          if(user.getMonth() === 11 &&(user.getDate() >=12 && user.getDate() <=29) ){
            if(el.value !== "09:00:00"){
              el.disabled = false
            }
          }

          if(user.getDate() === 24){
            if(+el.value.split(":")[0] >= 9 && +el.value.split(":")[0] <= 14){
              el.disabled = false
            } else {
              el.disabled = true
            }
          }

          if(user.getDate() === 29){
            if((+el.value.split(":")[0] >= 9)&& +el.value.split(":")[0] <= 17){
              el.disabled = false
            } else {
              el.disabled = true
            }
          }
         
          return el
        }),
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