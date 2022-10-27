import { get, post } from "./api"
import moment from 'moment'

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
  return get(`/schedules-by-user/${user}`)
}