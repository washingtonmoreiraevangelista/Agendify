import dayjs from 'dayjs';
import { openingHours } from "../../utils/opening-hours";
import { scheduleBlock } from '../../services/schedule-block';
import { schedulesDayAdmin } from './schedules-admin';
import { scheduleCancel } from "../../services/schedule-cancel"


const morning = document.getElementById("period-morning")
const afternoon = document.getElementById("period-afternoon")
const night = document.getElementById("period-night")

export async function scheduleShowAdmin({ schedules = [] }) {
  // Limpa as listas
  morning.innerHTML = ""
  afternoon.innerHTML = ""
  night.innerHTML = ""

  openingHours.forEach(hour => {
    const li = document.createElement("li")
    li.classList.add("schedule-item")

    // --- LÓGICA PARA VERIFICAR SE O HORÁRIO PASSOU ---
    const dateInput = document.getElementById("date").value
    const scheduleDate = dayjs(`${dateInput}T${hour}`)
    const isPast = scheduleDate.isBefore(dayjs()) 
    // ------------------------------------------------

    const time = document.createElement("span")
    time.classList.add("time")
    time.textContent = hour

    const name = document.createElement("span")
    name.classList.add("client-name")

    // Comparamos apenas a hora e minuto formatados para evitar erros de fuso horário
    const schedule = schedules.find(s =>
      dayjs(s.when).format("HH:mm") === hour
    )

    if (schedule) {
      // Exibe o nome do cliente e os serviços (juntando o array de serviços com vírgula)
      const servicesText = schedule.services ? ` (${schedule.services.join(", ")})` : ""
      name.innerHTML = `<strong>${schedule.name}</strong> <small>${servicesText}</small>`

      li.dataset.id = schedule.id

      // Define se é um bloqueio ou agendamento real
      const isBlocked = schedule.name === "🚫 BLOQUEADO"

      // Só cria e adiciona o botão se o horário NÃO passou
      if (!isPast) {
        const btnCancel = document.createElement("button")
        btnCancel.classList.add("btn-cancel")
        btnCancel.textContent = isBlocked ? "Desbloquear" : "Cancelar"

        //  O EVENTO DE CLICK
        btnCancel.onclick = async () => {
          const confirmMessage = isBlocked
            ? "Deseja liberar este horário?"
            : `Deseja cancelar o agendamento de ${schedule.name}?`

          if (confirm(confirmMessage)) {
            // Chama a função de deletar passando o ID que veio do banco
            await scheduleCancel({ id: schedule.id })

            // Recarrega a lista para o horário voltar a ficar [Livre]
            await schedulesDayAdmin()
          }
        }
        li.append(time, name, btnCancel)
      } else {
        // Se passou, adiciona uma classe visual e apenas o texto
        li.classList.add("hour-past")
        li.append(time, name)
      }

    } else {
      // Se for horário livre e já passou, mostramos como encerrado
      if (isPast) {
        li.classList.add("hour-past")
        name.textContent = "[Encerrado]"
        li.append(time, name)
      } else {
        name.textContent = "[Livre]"
        const btnBlock = document.createElement("button")
        btnBlock.classList.add("btn-block")
        btnBlock.textContent = "Bloquear"

        btnBlock.onclick = async () => {
          const professionalId = localStorage.getItem("@app:userId")

          // Criamos a data completa unindo o input de data + a hora da linha
          const when = dayjs(`${dateInput}T${hour}`)

          await scheduleBlock({ when, professionalId })

          // Recarrega a agenda para mostrar o horário como ocupado (bloqueado)
          await schedulesDayAdmin()
        }
        li.append(time, name, btnBlock)
      }
    }

    // Distribui nos períodos
    const h = parseInt(hour.split(":")[0])
    if (h < 12) morning.appendChild(li)
    else if (h < 18) afternoon.appendChild(li)
    else night.appendChild(li)
  })

}