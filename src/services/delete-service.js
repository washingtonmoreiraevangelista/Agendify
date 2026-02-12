import { apiConfig } from './api-config';
import { showMessage } from '../utils/showMessage';


export async function deleteServices({ id }) {
  try {
    await fetch(`${apiConfig.baseURL}/services/${id}`, {
      method: "DELETE",
    })
    showMessage("Serviço cancelado com sucesso!")
  } catch (error) {
    showMessage("Não foi possível deletar o Serviço!")
    console.log(error)
  }
}

