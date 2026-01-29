import { schedulesDay } from '../schedules/schedule-load'

export function initDateChange() {

//selecionar input de data 
const selectedDate = document.getElementById("date")

  if (!selectedDate) return

//Recarregar a lista de horários quando o input de data mudar
selectedDate.onchange = () => schedulesDay()
}