export async function adminProfessionals() {
  const adminSection = document.querySelector(".profile-info");

  // Verifica se o elemento existe na página antes de continuar
  if (!adminSection) return;

  try {
    const response = await fetch("http://localhost:3333/professional");
    const professionals = await response.json();

    // Pega o ID do profissional logado
    const loggedProfessionId = localStorage.getItem("@app:userId");
    
    // Procura o profissional
    const loggedPro = professionals.find(pro => String(pro.id) === String(loggedProfessionId));

    if (loggedPro) {
      adminSection.innerHTML = `
          <div class="avatar-wrapper">
            <img
              src="${loggedPro.avatar}"
              alt="${loggedPro.name}"
              id="preview-avatar"
            />
          </div>

          <div class="profile-details">
            <h2>Olá, <span id="admin-name">${loggedPro.name}</span></h2>
            <p>Gerencie seus serviços e sua agenda diária.</p>
          </div>
      `;
    } 

  } catch (error) {
    console.error("Erro ao carregar profissionais:", error);
  }
}