import { profile } from '../../services/profile'
import { showMessage } from '../../utils/showMessage'
import { formatPhoneNumber } from '../../utils/formatMask'
import { login } from '../../services/profile'
import { fetchProfessionals } from '../../services/fetch-professionals'


export function loginModal() {
  const modal = document.getElementById("login-modal")
  if (!modal) return

  const handleAdminButton = () => {

    // ID do seu botão/link no HTML
    const btnAdmin = document.getElementById("btn-admin-panel");
    const isAdmin = localStorage.getItem("@app:isAdmin");

    if (btnAdmin) {
      btnAdmin.style.display = (String(isAdmin) === "true") ? "block" : "none";
    }
  }

  // Executa ao carregar para garantir que o estado atual seja respeitado
  handleAdminButton()

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

          showMessage("Cadastro realizado com sucesso!", "success");
          registerForm.reset();

          //Redirecionamento
          setTimeout(() => {
            const isAdmin = localStorage.getItem("@app:isAdmin");

            if (isAdmin === "true") {
              window.location.href = "admin.html";
            } else {
              window.location.href = "scheduling.html";
            }
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

        // tenta buscar nos profissionais
        const professionals = await fetchProfessionals()
        const proUser = professionals.find(pro => String(pro.phone) === String(phone))

        if (proUser) {
          // Se achou no /professional, é ADMIN
          localStorage.setItem("@app:userId", proUser.id)
          localStorage.setItem("@app:name", proUser.name)
          localStorage.setItem("@app:isAdmin", "true")

          showMessage("Login realizado com sucesso!", "success")
          setTimeout(() => { window.location.href = "admin.html" }, 1500)
          // Para a execução aqui
          return
        }

        // Se não achou profissional, tenta o login normal (clientes comuns) ,
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
        setTimeout(() => {
          // Verificamos se user.isAdmin é true (pode vir como booleano ou string da API)
          if (String(user.isAdmin) === "true") {
            // Se for admin, vai para a página de administração
            window.location.href = "admin.html"
          } else {
            // Se não for admin, vai para o agendamento comum
            window.location.href = "scheduling.html"
          }
        }, 1500)

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
