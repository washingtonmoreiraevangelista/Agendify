import { apiConfig } from './api-config'

export async function adminProfile({ name, phone, description, avatar, isAdmin = true }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/admin`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ name, phone, description,avatar, isAdmin })
    })

    // Retorna o usuário com o ID gerado
    return await response.json()
  } catch (error) {
    console.log(error)
    showMessage("Não foi possível registrar o perfil")
  }
}

