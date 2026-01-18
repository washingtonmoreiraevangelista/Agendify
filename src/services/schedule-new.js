import { apiConfig } from './api-config'

export async function scheduleNew({ id, name, when, professional }) {
  try {

    // Recupera o telefone de quem "logou"
    const userId = localStorage.getItem("@app:userId")

    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        name,
        when,
        professional,
        userId
      })
    })

  } catch (error) {
    console.log(error)
    alert("Não foi possível agendar!")
  }
}

