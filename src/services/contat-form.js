import { apiConfig } from './api-config'
import { showMessage } from '../utils/showMessage'

export async function sendContactMessage({ name, email, message }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/contact`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    })

    if (!response.ok) {
        throw new Error("Erro ao enviar mensagem")
    }

    return await response.json()
  } catch (error) {
    console.log(error)
    // Usando sua função de mensagem de erro
    showMessage("Não foi possível enviar sua mensagem. Tente novamente mais tarde.")
  }
}

export async function getContactMessages() {
  try {
    const response = await fetch(`${apiConfig.baseURL}/contact`);
    if (!response.ok) throw new Error("Erro ao buscar mensagens");
    
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}