import dayjs from 'dayjs'
import { scheduleNew } from '../../services/schedule-new'
import { showMessage } from '../../utils/showMessage'
import { schedulesDay } from '../schedules/schedule-load'

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")
const professionalSelect = document.querySelector("#professional")


//Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//Data maxima de agendamento
const maxDate = "2026-12-31"

//Carregar data atual
selectedDate.value = inputToday

//Data minima (Bloqueia data anteriores) e Data maxima
selectedDate.min = inputToday
selectedDate.max = maxDate

form.onsubmit = async (e) => {
  e.preventDefault()


  try {
    //Recuperando nome do client
    const name = clientName.value.trim()
    const professional = professionalSelect.value

    //Recuperar horário selecionado
    const hourSelected = document.querySelector(".hour-selected")

    if (!name || !professional || !hourSelected) {
      showMessage("Preencha todos os campos!", "error")
      return
    }

    //Recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":")

    //Inserir a hora na data
     const when = dayjs(selectedDate.value).add(hour, "hour")
     
    //Faz agendamento
    await scheduleNew(
      {
        name,
        hourSelected,
        when,
        professional
      }
    )

    //Recarregar agendamentos 
    await schedulesDay()

    showMessage("Agendamento realizado com sucesso ! ", "success")
    form.reset()

  } catch (error) {
    showMessage("Não foi possível realizar o agendamento !", "error")
    console.log(error)
  }

}
