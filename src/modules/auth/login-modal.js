import { profile, login } from '../../services/profile'
import { showMessage } from '../../utils/showMessage'
import { formatPhoneNumber } from '../../utils/formatMask'

export function loginModal() {
  const modal = document.getElementById("login-modal")
  if (!modal) return

  const tabs = modal.querySelectorAll(".tab")
  const forms = modal.querySelectorAll(".modal-form")
  const registerForm = modal.querySelector("#register-form")
  const loginForm = modal.querySelector("#login-form")

  // Máscaras de Telefone
  const registerPhone = modal.querySelector("#register-phone")
  const loginPhone = modal.querySelector("#login-phone")

  const applyMask = (e) => { e.target.value = formatPhoneNumber(e.target.value) }
  if (registerPhone) registerPhone.addEventListener("input", applyMask)
  if (loginPhone) loginPhone.addEventListener("input", applyMask)

  // Isso garante que botões criados via API também funcionem
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agendar")) {
      e.preventDefault()
      
      const isLogged = !!localStorage.getItem("@app:userId")

      if (isLogged) {
        window.location.href = "scheduling.html"
      } else {
        modal.classList.add("active")
      }
    }
  })

  // Alternar entre Login e Cadastro
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"))
      forms.forEach((f) => f.classList.remove("active"))
      tab.classList.add("active")
      modal.querySelector(`#${tab.dataset.tab}-form`)?.classList.add("active")
    })
  })

  // Lógica de Cadastro
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const name = modal.querySelector("#register-name").value.trim()
      const phone = modal.querySelector("#register-phone").value.replace(/\D/g, "")

      if (!name || !phone) return showMessage("Preencha todos os campos!")

      try {
        const newUser = await profile({ name, phone, isAdmin: false })
        if (newUser?.id) {
          localStorage.setItem("@app:userId", newUser.id)
          localStorage.setItem("@app:name", newUser.name)
          showMessage("Cadastro realizado com sucesso!", "success")
          setTimeout(() => { window.location.href = "scheduling.html" }, 1500)
        }
      } catch (error) {
        showMessage("Erro ao realizar cadastro")
      }
    })
  }

  // Lógica de Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const phoneInput = modal.querySelector("#login-phone")
      const phone = phoneInput.value.replace(/\D/g, "")

      if (!phone) return showMessage("Informe seu telefone!")

      try {
        const users = await login({ phone })
        if (!users || users.length === 0) return showMessage("Telefone não cadastrado.")

        const user = users[0]
        localStorage.setItem("@app:userId", user.id)
        localStorage.setItem("@app:name", user.name)
        
        showMessage("Login realizado com sucesso!", "success")
        setTimeout(() => { window.location.href = "scheduling.html" }, 1500)
      } catch (error) {
        showMessage("Erro ao tentar logar.")
      }
    })
  }

  // Fechar modal ao clicar fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active")
  })
}