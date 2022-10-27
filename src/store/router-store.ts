import { createStore } from 'luffie';

const initialData = {

}

const { state$} = createStore(initialData);


export {
  state$ as RouterStore
}