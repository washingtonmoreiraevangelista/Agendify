import { apiConfig } from './api-config'

export async function createServices({ name, price }) {
  try {

    await fetch(`${apiConfig.baseURL}/services`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price
      })
    })


  } catch (error) {
    console.log(error)
    alert("Não foi possível criar novo serviço!")
  }
}

