export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available")

  hours.forEach((available) => {
    //Pegar horários diponiveis
    available.addEventListener("click", (selected) => {
      //Remover  a classe de horários hour-selected de todas as li selecionadas
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected")
      })

      //Adiciono a classe na li clicada
      selected.target.classList.add("hour-selected")
    })
  })
}