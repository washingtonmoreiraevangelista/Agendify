import dayjs from "dayjs" 
import { scheduleShowAdmin } from "./schedule-show-admin"

export async function schedulesDayAdmin() {
  const dateInput = document.getElementById("date")
  const professionalId = localStorage.getItem("@app:userId")

  if (!dateInput || !professionalId) return

  try {
    // Busca os agendamentos da API
    // (Ajustei para buscar conforme o seu db.json que usa a propriedade 'professional')
    const response = await fetch(`http://localhost:3333/schedules?professional=${professionalId}`)
    const allSchedules = await response.json()

    // Agora o dayjs vai funcionar aqui!
    const dailySchedule = allSchedules.filter((s) => 
      dayjs(s.when).format("YYYY-MM-DD") === dateInput.value
    )

    console.log("Agendamentos encontrados:", dailySchedule)

    await scheduleShowAdmin({ schedules: dailySchedule })

  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error)
  }
}