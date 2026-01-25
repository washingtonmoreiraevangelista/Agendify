import dayjs from 'dayjs';
import { showMessage } from '../../utils/showMessage';

//Selecionar as sessões manha, tarde e noite
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function scheduleShow({ dailySchedule }) {
  try {

    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    //renderizar os agendamentos por período
    dailySchedule.forEach((schedule) => {
      const item = document.createElement("li")
      const time = document.createElement("strong")
      const name = document.createElement("span")

      // Criar o elemento de serviços
      const servicesElement = document.createElement("span")
      servicesElement.classList.add("schedule-services")

      // Adicionar o id do agendamento
      item.setAttribute("data-id", schedule.id)
      time.textContent = dayjs(schedule.when).format("DD/MM [às] HH:mm")
      name.textContent = `Profissional: ${ schedule.professional}`

      //  Formatar a lista de serviços (Corrigido o parêntese e ternário)
      servicesElement.textContent = schedule.services ? `Serviços: ${schedule.services.join(", ")}` : "Sem serviços"

      //Criar ícone de cancelar
      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")


      //Adicionar o tempo , nome e ícone
      item.append(time, name, servicesElement, cancelIcon,)

      //Obter somente a hora
      const hour = dayjs(schedule.when).hour()

      //renderizar o agendamento baseado manha, tarde e noite

      if (hour <= 12) {
        periodMorning.appendChild(item)
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }

    })

  } catch (error) {
    showMessage("Não foi possível exibir os agendamentos !")
    console.log(error)
  }
}