import { apiConfig } from './api-config';
import { showMessage } from '../utils/showMessage';


export async function profile({ name, phone, isAdmin = false }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/profiles`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },

      // Salve como 'name' e 'phone' para ser simples
      body: JSON.stringify({ name, phone, isAdmin })
    })

    // Retorna o usuário com o ID gerado
    return await response.json()
  } catch (error) {
    console.log(error)
    showMessage("Não foi possível registrar o perfil")
  }
}

export async function login({ phone }) {

  try {
    const response = await fetch(`${apiConfig.baseURL}/profiles?phone=${phone}`)
    const users = await response.json()

    return users
  } catch (error) {
    console.error(error);
    return null
  }

}