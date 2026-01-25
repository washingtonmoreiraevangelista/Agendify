import dayjs from 'dayjs'
import { openingHours } from "../../utils/opening-hours"
import { hoursClick } from './hours-click'

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedule }) {

  //Limpa lista de horários
  hours.innerHTML = " "

  //Obter a lista de todos os horários ocupados, Só pega os horários ocupados DO DIA selecionado
  const unavailableHours = dailySchedule
    .filter((schedule) => dayjs(date).isSame(dayjs(schedule.when), "day"))
    .map((schedule) => dayjs(schedule.when).format("HH:mm"));


  const opening = openingHours.map((hour) => {
    //Recuperar hora
    const [scheduleHour] = hour.split(":")

    //Adicionar a hora na data e verificar se esta no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

    const available = !unavailableHours.includes(hour) && !isHourPast

    //Define se o horário esta disponível
    return {
      hour,
      available
    }
  })

  //Renderizar os horários 
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if (hour === "09:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    hours.append(li)
  })

  //Adicionar evento de click dos horários disponíveis
  hoursClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}