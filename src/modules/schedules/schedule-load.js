import { schedulesByUser } from '../../services/schedules-by-user'
import { hoursLoad } from '../form/hours-load';
import { scheduleShow } from './show';

export async function schedulesDay() {
  const selectedDate = document.getElementById("date")
  const professionalSelect = document.getElementById("professional")
  const userId = localStorage.getItem("@app:userId")

  if (!selectedDate || !professionalSelect) {
    console.warn("Elementos de data ou profissional não encontrados no DOM.")
    return
  }

  // PRIMEIRO obtemos os valores
  const date = selectedDate.value
  // Usamos o selectedIndex para garantir a captura correta do valor
  const professionalId = professionalSelect.options[professionalSelect.selectedIndex]?.value
  const professionalName = professionalSelect.options[professionalSelect.selectedIndex]?.text

  // AGORA fazemos o log (depois de definir a variável)
  console.log("ID capturado:", professionalId)

  // Validação: Só continua se ambos estiverem preenchidos e não for a opção padrão
  if (!date || !professionalId || professionalId === "") return

  try {
    // Busca os agendamentos filtrados por data e profissional
    const allProfessionalSchedules = await schedulesByUser({ date, professionalId })

    //  Filtra para a lista (scheduleShow) apenas o que for do usuário logado Convertemos ambos para String para evitar erro de tipo (número vs texto)
const userSchedules = allProfessionalSchedules
      .filter(s => String(s.userId) === String(userId))
      .map(s => ({
        ...s,
        displayProfessionalName: professionalName 
      }))
      
    // Atualiza a lista de agendamentos do usuário
    scheduleShow({ dailySchedule: userSchedules })

    //  Atualiza os horários (bloqueando o que estiver ocupado por QUALQUER usuário)
    hoursLoad({ date, dailySchedule: allProfessionalSchedules })

  } catch (error) {
    console.error("Erro ao carregar o dia:", error)
  }
}
