import { createStore } from 'luffie';

const initialData = {
  showSchedule:false
}

const { state$,updateState} = createStore(initialData);

const setShowSchedule = (show) => {
  updateState({showSchedule:show})
}
export {
  state$ as HomeStore,
  setShowSchedule
}