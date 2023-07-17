import { del, get, post } from "./api"
import moment from 'moment'

moment.locale('pt-br');

export interface ISchedule{
    user:{
        name:String,
        phone:String
    },
     date:String,
     hour:String,
     dateRegister:String,
     typeCut:{
       title:String,
       price:String
     }
  
}
export const getHoursByDate= (date) => {
  const format = moment(date).format('YYYY-MM-DD')
  return get(`/schedule-hours/${format}`)
}

export const saveScheduleApi = (data:ISchedule) => {
  return post(`/schedule`,data)
}

export const getSchedulesByUserApi = (user) => {
  return get(`/schedules-by-id/${user}`)
}

export const deleteScheduleApi = (id) => {
  return del(`/schedule/${id}`)
} 

export const getInfosApi = (filter:any) => {
  const filterFormat = '?search=' + filter.search + '&inicio=' + filter.inicio + '&fim=' + filter.fim

  return get(`/infos${filterFormat}`)
}


export const saveholiday = (params) => {
  return post(`/holiday`,params)
}