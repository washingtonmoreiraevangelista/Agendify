export async function fetchProfessionals() {
  try {
    const response = await fetch(`${apiConfig.baseURL}/professionals`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error)
    return []
  }
}