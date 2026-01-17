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
      modal.classList.add("active")
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

      const userName = nameInput.value.trim()
      const userPhone = phoneInput.value.replace(/\D/g, "")

      if (!userName) {
        showMessage("Favor inserir seu nome!")
        return
      }

      if (!userPhone) {
        showMessage("Favor inserir o telefone com DDD!")
        return
      }


      try {
        await profile(
          {
            userName,
            userPhone,
            isAdmin: false
          }
        )
        showMessage("Cadastro realizado com sucesso!", "success")
        registerForm.reset()

        setTimeout(() => {
          window.location.href = "scheduling.html"
        }, 1500)

      } catch {
        showMessage("Não foi possível realizar o cadastro")
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
        const user = await login({ phone })

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
