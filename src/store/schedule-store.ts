import { createStore } from 'luffie';
import { getHoursByDate } from '../services/schedule-service';

const initialData = {
  hoursSelected: [],
  isLoading:false
}

const { state$,updateState} = createStore(initialData);

const getHours = (date) => {
  updateState({isLoading:true})
  getHoursByDate(date).subscribe((response) => {
    updateState({hoursSelected:response,isLoading:false})
  },err => {
    updateState({hoursSelected:[],isLoading:false})
  })
}
const setLoading = (loading) => {
  updateState({isLoading:loading})
}


export {
  state$ as ScheduleStore,
  getHours,
  setLoading
}