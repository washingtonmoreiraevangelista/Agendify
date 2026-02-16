import { getContactMessages } from '../../services/contat-form';

export async function renderContactMessages() {
  const listContainer = document.getElementById("contact-messages-list");

  if (!listContainer) return;

  const messages = await getContactMessages();

  // Limpa o container
  listContainer.innerHTML = "";

  if (!messages || messages.length === 0) {
    listContainer.innerHTML = "<p>Nenhuma mensagem recebida.</p>";
    return;
  }

  // Cria o HTML para cada mensagem
  messages.forEach(msg => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("admin-list-item")

    messageElement.innerHTML = `
      <div class="message-content" style="border-bottom: 1px solid #eee; padding: 10px 0;">
        <strong style="display: block; color: #7a42f4;">${msg.name}</strong>
        <small style="color: #666;">${msg.email}</small>
        <p style="margin-top: 5px; font-style: italic;">"${msg.message}"</p>
      </div>
    `;

    listContainer.appendChild(messageElement);
  });
}

// Chame essa função no carregamento da página
document.addEventListener("DOMContentLoaded", renderContactMessages);