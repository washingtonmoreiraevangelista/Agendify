import dayjs from 'dayjs'
import { scheduleNew } from '../../services/schedule-new'
import { showMessage } from '../../utils/showMessage'
import { schedulesDay } from '../schedules/schedule-load'

export function initSubmit() {

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const professionalSelect = document.querySelector("#professional")

if (!form || !selectedDate) return

//Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//Data maxima de agendamento
const maxDate = dayjs(new Date()).add(30, "day").format("YYYY-MM-DD")

//Carregar data atual
selectedDate.value = inputToday

//Data minima (Bloqueia data anteriores) e Data maxima
selectedDate.min = inputToday
selectedDate.max = maxDate

form.onsubmit = async (e) => {
  e.preventDefault()


  try {
    // Recuperar profissional e horário
    const professional = professionalSelect.value

    // Busca todos os checkboxes marcados
    const checkedServices = Array.from(form.querySelectorAll('input[name="service"]:checked'));

    // Extrai apenas os valores (nomes dos serviços)
    const serviceSelected = checkedServices.map(input => input.value);

    if (serviceSelected.length === 0) {
      showMessage("Por favor, selecione ao menos um serviço para agendar.", "error");
      return; 
    }

    //Recuperar horário selecionado
    const hourSelected = document.querySelector(".hour-selected")

    if (!professional || !hourSelected || !serviceSelected) {
      showMessage("Preencha todos os campos!", "error")
      return
    }

    //Recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":")

    //Inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour")

    const clientName = localStorage.getItem("@app:name")
    //Faz agendamento
    await scheduleNew(
      {
        name: clientName,
        hourSelected,
        when,
        professional,
        services: serviceSelected
      }
    )

    //Recarregar agendamentos 
    await schedulesDay()

    showMessage("Agendamento realizado com sucesso ! ", "success")
    form.reset()

    //vota a data para a atual
    const inputToday = dayjs().format("YYYY-MM-DD")
    selectedDate.value = inputToday

  } catch (error) {
    showMessage("Não foi possível realizar o agendamento !", "error")
    console.log(error)
  }

}
}