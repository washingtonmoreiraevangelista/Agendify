export async function loadServices() {
  // Elemento da Página Inicial (Home)
  const carrosselContainer = document.getElementById('carousel-services');
  // Elemento da Página de Agendamento (Scheduling)
  const servicesListContainer = document.getElementById('services-list');

  try {
    const response = await fetch("http://localhost:3333/services");
    const data = await response.json();

    // Garante a captura da lista independente do formato da API
    const services = data.services || data;

    if (!services) return;

    //  RENDERIZA NA HOME (CARROSSEL)
    if (carrosselContainer) {
      carrosselContainer.innerHTML = services.map(service => `
        <div class="service-card">
          <h3>${service.name}</h3>
          <p class="price">${service.price}</p>
          <span class="time">${service.time || "30 min"}</span>
          <button class="btn-agendar">Agendar</button>
        </div>
      `).join('');

      // Inicializa o movimento do carrossel após criar os itens
      initCarousel();
    }

    // RENDERIZA NO AGENDAMENTO (LISTA DE SELEÇÃO)
    if (servicesListContainer) {
      servicesListContainer.innerHTML = services.map(service => `
        <label class="service-option">
          <input type="checkbox" name="service" value="${service.name}" >
          <div class="service-info">
            <strong>${service.name}</strong>
            <span>R$ ${service.price}</span>
          </div>
        </label>
      `).join('');
    }

  } catch (error) {
    console.error("Erro ao carregar serviços dinâmicos:", error);
  }
}

function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');

  if (!carousel || !next || !prev) return;

  next.onclick = () => carousel.scrollBy({ left: 300, behavior: 'smooth' });
  prev.onclick = () => carousel.scrollBy({ left: -300, behavior: 'smooth' });
}