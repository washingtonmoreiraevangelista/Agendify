import { getContactMessages } from '../../services/contat-form';

export async function initContactModal() {
  const modal = document.getElementById("contactModal");
  const openBtn = document.getElementById("openMessagesBtn");
  const closeBtn = document.querySelector(".close-btn");
  const listContainer = document.getElementById("contact-messages-list");

  if (!modal || !openBtn) return;

  // Abrir modal e carregar mensagens
  openBtn.onclick = async () => {
    modal.style.display = "block";
    await renderContactMessages(listContainer);
  };

  // Fechar no "X"
  closeBtn.onclick = () => modal.style.display = "none";

  // Fechar ao clicar fora do modal
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
  };
}

async function renderContactMessages(container) {
  container.innerHTML = "<p>Carregando mensagens...</p>";

  const messages = await getContactMessages();
  container.innerHTML = "";

  if (!messages || messages.length === 0) {
    container.innerHTML = "<p>Nenhuma mensagem recebida.</p>";
    return;
  }

  messages.forEach(msg => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("admin-list-item");
    messageElement.style.padding = "15px 0";
    messageElement.style.borderBottom = "1px solid #eee";

    messageElement.innerHTML = `
      <strong style="display: block; color: #f5c77a;">${msg.name}</strong>
      <small style="color: #f0e8e8;">${msg.email}</small>657
      <p style="margin-top: 8px; font-style: italic; color: #f5c77a;">"${msg.message}"</p>
    `;
    container.appendChild(messageElement);
  });
}