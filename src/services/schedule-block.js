import { apiConfig } from './api-config';

export async function scheduleBlock({ when, professionalId }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "BLOQUEADO",
        when,
        professional: professionalId,
        services: ["Bloqueio Administrativo"],
        userId: "admin"
      })
    })
    return await response.json()

  } catch (error) {
    console.error("Erro ao bloquear horário:", error)
    alert("Não foi possível bloquear o horário.")
  }
}