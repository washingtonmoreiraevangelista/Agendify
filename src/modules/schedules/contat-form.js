import { sendContactMessage } from "../../services/contat-form"

export function contactFormLoad() {
  const form = document.querySelector('.contact-form');

  // 2. Verificamos se o form existe para evitar erros em outras páginas
  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const inputs = form.querySelectorAll('input');
      const textarea = form.querySelector('textarea');

      const dados = {
        name: inputs[0].value,
        email: inputs[1].value,
        message: textarea.value
      };

      console.log('Tentando enviar dados:', dados);

      const result = await sendContactMessage(dados);

      if (result) {
        console.log('Sucesso:', result);
        alert('Mensagem enviada com sucesso!');
        form.reset();
      }
    });
  } else {
    console.warn("Formulário '.contact-form' não encontrado nesta página.");
  }
}

