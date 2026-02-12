export async function listServices() {
  const servicesList = document.getElementById("services-list")

  try {
    const response = await fetch(`http://localhost:3333/services`)
    const data = await response.json()
    const services = data.services || data

    servicesList.innerHTML = ""
    
    servicesList.innerHTML = services.map(e => `
      <div class="admin-item" data-id="${e.id}"> <div>
          <strong>${e.name}</strong> 
          <span>R$ ${e.price}</span>
        </div>
        <button class="btn-icon-delete">&times;</button>
      </div>`
    ).join("")

  } catch (error) {
    console.error("Erro ao carregar:", error)
  }
}