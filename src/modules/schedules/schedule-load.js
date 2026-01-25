import { schedulesByUser } from '../../services/schedules-by-user'
import { hoursLoad } from '../form/hours-load';
import { scheduleShow } from './show';

//Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay() {

  if (!selectedDate) return

  //Obter a data do input
  const date = selectedDate.value

  // Buscar na API os agendamentos 
  const dailySchedule = await schedulesByUser({ date })

  // Exibir agendamentos
  scheduleShow({ dailySchedule })

  //Horários disponíveis
  hoursLoad({ date, dailySchedule })
}