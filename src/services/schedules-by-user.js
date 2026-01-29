import { apiConfig } from './api-config'

export async function schedulesByUser({ date, professionalId }) {
  try {
  
    // Faz o fetch filtrando por DATA e PROFISSIONAL
    const response = await fetch(
      `${apiConfig.baseURL}/schedules?date=${date}&professional=${professionalId}`
    )

    const schedules = await response.json()
    
    return schedules
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar os agendamentos.")
    return []
  }
}