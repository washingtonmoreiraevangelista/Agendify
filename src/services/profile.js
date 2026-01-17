import { apiConfig } from './api-config';
import { showMessage } from '../utils/showMessage';


export async function profile({ name, phone, isAdmin = false }) {
  try {
    await fetch(`${apiConfig.baseURL}/profiles`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, isAdmin })
    })

    const data = await response.json()
    return data

  } catch (error) {
    showMessage("Não foi possível registrar profile")
    console.log(error)
  }
}

export async function login({ phone }) {

  try {
    const response = await fetch(`${apiConfig.baseURL}/profiles?phone=${phone}`)
    const users = await response.json()

    //Verifica se encontrou algum usuário com esse telefone
    if (users.length > 0) {
      const user = users[0]
      // salva o telefone para usar no agendamento
      localStorage.setItem("@app:userName", user.name);
      localStorage.setItem("@app:phone", user.phone);
      return user
    }
    return null
  } catch (error) {
    console.error(error);
    return null
  }

}