import { deleteServices } from '../../services/delete-service'
import { listServices } from './list-services'

const servicesList = document.getElementById("services-list")

servicesList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-icon-delete")) {

    const item = event.target.closest(".admin-item");
    const id = item.dataset.id

    if (id) {
      const isConfirm = confirm("Deseja realmente excluir este serviço?")
      
      if (isConfirm) {
        // Usa a função de deletar que você já criou
        await deleteServices({ id })
        
        // Em vez de item.remove(), recarregue a lista para garantir 
        // que o estado do banco e da tela sejam iguais
        await listServices() 
      }
    }
  }
})