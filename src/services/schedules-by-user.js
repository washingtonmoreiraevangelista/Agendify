import { apiConfig } from './api-config'

export async function schedulesByUser({data}) {
  try {
    const userId = localStorage.getItem("@app:phone")

    //faz o fetch filtrando pelo user id 
    const response = await fetch(`${apiConfig.baseURL}/schedules?userId=${userId}`)

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar seus agendamentos.")
  }
}