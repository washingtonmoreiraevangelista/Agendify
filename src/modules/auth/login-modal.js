import { profile } from '../../services/profile'
import { showMessage } from '../../utils/showMessage'
import { formatPhoneNumber } from '../../utils/formatMask'
import { login } from '../../services/profile'

export function loginModal() {
  const modal = document.getElementById("login-modal")
  if (!modal) return

  const buttons = document.querySelectorAll(".btn-agendar")
  const tabs = modal.querySelectorAll(".tab")
  const forms = modal.querySelectorAll(".modal-form")

  const registerForm = modal.querySelector("#register-form")
  const loginForm = modal.querySelector("#login-form")

  // --- CAPTURA DOS INPUTS PARA A MÁSCARA ---
  const registerPhone = modal.querySelector("#register-phone")
  const loginPhone = modal.querySelector("#login-phone")

  // Função para aplicar a máscara enquanto digita
  const applyMask = (e) => {
    e.target.value = formatPhoneNumber(e.target.value)
  }

  if (registerPhone) registerPhone.addEventListener("input", applyMask)
  if (loginPhone) loginPhone.addEventListener("input", applyMask)


  // Abrir modal
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const isLogged = !!localStorage.getItem("@app:userId")

      if (isLogged) {
        // usuário logado → vai para agendamento
        window.location.href = "scheduling.html"
      } else {
        // não logado → abre modal
        modal.classList.add("active")
      }
    })
  })

  // Alternar Login / Cadastro
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"))
      forms.forEach((f) => f.classList.remove("active"))

      tab.classList.add("active")
      modal
        .querySelector(`#${tab.dataset.tab}-form`)
        ?.classList.add("active")
    })
  })

  //  Capturar dados do cadastro
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const nameInput = modal.querySelector("#register-name")
      const phoneInput = modal.querySelector("#register-phone")

      const name = nameInput.value.trim()
      const phone = phoneInput.value.replace(/\D/g, "")

      if (!name) {
        showMessage("Favor inserir seu nome!")
        return
      }

      if (!phone) {
        showMessage("Favor inserir o telefone com DDD!")
        return
      }


      try {

        // Envia os dados e ESPERA o objeto criado (com o ID) voltar da API
        const newUser = await profile({
          name,
          phone,
          isAdmin: false
        });

        //Verifica se o usuário realmente foi criado
        if (newUser && newUser.id) {

          // Salva na sessão para o agendamento funcionar depois
          localStorage.setItem("@app:userId", newUser.id);
          localStorage.setItem("@app:name", newUser.name);
          localStorage.setItem("@app:isAdmin", false);

          showMessage("Cadastro realizado com sucesso!", "success");
          registerForm.reset();

          //Redirecionamento
          setTimeout(() => {
            window.location.href = "scheduling.html";
          }, 1500);

        } else {
          // Caso a API responda mas sem os dados esperados
          showMessage("Erro ao processar retorno do servidor.");
        }

      } catch (error) {
        console.error("Erro no cadastro:", error);
        showMessage("Não foi possível realizar o cadastro");
      }

    })
  }

  //  Capturar dados do login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      //Capture o elemento primeiro
      const phoneInput = modal.querySelector("#login-phone")

      //Verifique se o elemento existe e pegue o valor
      const phoneRawValue = phoneInput ? phoneInput.value : ""

      //Agora aplique o replace na string correta
      const phone = phoneRawValue.replace(/\D/g, "")

      if (!phone) {
        showMessage("Favor inserir o telefone com DDD!")
        return
      }

      try {
        // Chamamos a função e ARMAZENAMOS o resultado
        const users = await login({ phone })

        //  valida se encontrou usuário
        if (!users || users.length === 0) {
          showMessage("Telefone não cadastrado.")
          return
        }

        // usuário logado
        const user = users[0]

        // salvar sessão
        localStorage.setItem("@app:userId", user.id)
        localStorage.setItem("@app:name", user.name)
        localStorage.setItem("@app:isAdmin", user.isAdmin)

        showMessage("Login realizado com sucesso!", "success")

        // SÓ realiza o login se o server retornou dados (user não é null)
        if (user) {
          showMessage("Login realizado com sucesso!", "success")
          setTimeout(() => {
            window.location.href = "scheduling.html"
          }, 1500)
        } else {
          // Se o server não tem os dados, exibe erro e PARA aqui.
          showMessage("Telefone não cadastrado .")
        }

      } catch (error) {
        console.error("Erro no processo de login:", error)
        showMessage("Erro técnico ao tentar logar.")
      }
    })
  }

  // Fechar clicando fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
}
