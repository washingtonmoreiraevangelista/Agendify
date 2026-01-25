export async function fetchServices() {
  try {
    const response = await fetch(`${apiConfig.baseURL}/services`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error)
    return []
  }
}