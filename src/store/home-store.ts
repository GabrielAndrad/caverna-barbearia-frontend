import create  from 'zustand';
interface initialData {
  showSchedule:boolean,
  setShowSchedule: (show:boolean) => void
}
const store = create<initialData>((set) => ({
  showSchedule:false,
  setShowSchedule: (show) => 
    set((state) => ({
      ...state,
      showSchedule:show
    })) 
}));


export default store