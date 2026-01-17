import { apiConfig } from './api-config';
import { showMessage } from '../utils/showMessage';


export async function scheduleCancel({ id }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    })
    showMessage("Agendamento cancelado com sucesso!")
  } catch (error) {
    showMessage("Não foi possível cancelar o agendamento!")
    console.log(error)
  }
}

