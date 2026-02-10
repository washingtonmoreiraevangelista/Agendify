import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours"
import { scheduleBlock } from "../../services/schedule-block"
import { schedulesDayAdmin } from "./schedules-admin"

// Inicializa os eventos básicos (Calendário e Filtro)
export function initAdminEvents() {
  const dateInput = document.getElementById("date")

  if (!dateInput) return

  // Define a data padrão e o limite mínimo como hoje
  const today = dayjs().format("YYYY-MM-DD")
  dateInput.value = today
  dateInput.min = today

  // Recarrega a lista quando mudar a data
  dateInput.onchange = () => {
    console.log("Data alterada para:", dateInput.value)
    schedulesDayAdmin()
  }

  // Inicializa também o bloqueio por intervalo
  initBlockRange()
}

// Lógica para bloquear vários dias (10 ao 15, etc)
function initBlockRange() {
  if (!btn) return
  // Evita erro caso o botão não exista na tela atual
  const btn = document.getElementById("btn-block-range")

  btn.onclick = async () => {
    const start = document.getElementById("date-start").value
    const end = document.getElementById("date-end").value
    const professionalId = localStorage.getItem("@app:userId")

    if (!start || !end) return alert("Selecione o início e o fim do intervalo.")

    let currentDate = dayjs(start)
    const endDate = dayjs(end)

    if (endDate.isBefore(currentDate)) return alert("A data final não pode ser anterior à data inicial!")

    if (confirm(`Bloquear todos os horários de ${start} até ${end}?`)) {
      
      // Adiciona um feedback visual de carregamento
      btn.innerText = "Bloqueando..."
      btn.disabled = true

      try {
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
          const dateStr = currentDate.format("YYYY-MM-DD")

          const promises = openingHours.map(hour => {
            const when = dayjs(`${dateStr}T${hour}`).toISOString()
            return scheduleBlock({ when, professionalId })
          })

          await Promise.all(promises)
          currentDate = currentDate.add(1, 'day')
        }

        alert("Intervalo bloqueado com sucesso!")
        schedulesDayAdmin()
      } catch (error) {
        console.error(error)
        alert("Ocorreu um erro ao bloquear o intervalo.")
      } finally {
        btn.innerText = "Bloquear Dias Selecionados"
        btn.disabled = false
      }
    }
  }
}