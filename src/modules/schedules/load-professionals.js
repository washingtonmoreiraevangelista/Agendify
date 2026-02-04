import { schedulesDay } from '../schedules/schedule-load'

export async function loadProfessionals() {

  //Pagina de agendamento
  const select = document.getElementById("professional")

  //Pagina inicial
  const teamContainer = document.querySelector(".team")

  try {

    const response = await fetch("http://localhost:3333/professional")
    const professionals = await response.json()

    //renderiza os profissionais na pagina de agendamento
    if (select) {
      professionals.forEach(pro => {
        const option = document.createElement("option")
        option.setAttribute("value", pro.id)
        option.textContent = pro.name
        select.appendChild(option)
      })

      select.addEventListener("change", () => {
        schedulesDay()
      })
    }

    //renderiza os profissionais na pagina inicial
    if (teamContainer) {
      teamContainer.innerHTML = ""
      professionals.forEach(pro => {
        teamContainer.innerHTML +=
          `
        <div class="team-card">
        <img src="${pro.avatar}" alt="${pro.name}" />
        <p>${pro.name} - ${pro.description}<p/>
        <div/>
        `
      })
    }

  } catch (error) {
    console.error("Erro ao carregar profissionais:", error)
  }
}