import { scheduleCancel } from '../../services/schedule-cancel'
import { schedulesDay } from './schedule-load'

const periods = document.querySelectorAll(".period")


// Gerar evento de click para cada lista (manha, tarde , noite)
periods.forEach((period) => {
  //Capturar o evento de click na lista
  period.addEventListener("click", async (event) => {

    if (event.target.classList.contains("cancel-icon")) {
      //Obtém a li pai do elemento clicado
      const item = event.target.closest("li")
      //Pega id do agendamento
      const { id } = item.dataset
      //Confirma que o id foi selecionado 
      if (id) {
        //Confirma se o usuario quer cancelar
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")

        if (isConfirm) {
          //Cancela o agendamento 
          await scheduleCancel({ id })
          item.remove()

          //Recarregar os agendamentos
          schedulesDay()
        }
      }

    }
  })
})
