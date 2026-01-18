export function handleLogout() {
  const btnLogout = document.getElementById("btn-logout")
  const userId = localStorage.getItem("@app:userId")
  const navAgendar = document.getElementById("nav-agendar")

  // Se NÃO estiver logado, garante que o botão de sair e o link sumam
  if (!userId) {
    if (btnLogout) btnLogout.style.display = "none"
    if (navAgendar) navAgendar.style.display = "none"
    return
  }

  // Se ESTIVER logado, mostra os botões e configura o clique
  if (btnLogout) {
    btnLogout.style.display = "inline-block"
    if (navAgendar) navAgendar.style.display = "inline-block"

    btnLogout.onclick = () => {
      // Limpa os dados
      localStorage.removeItem("@app:userId")
      localStorage.removeItem("@app:name")
      localStorage.setItem("@app:isAdmin", false)

      // Redireciona para a Home. 
      // Ao recarregar, o script de verificação verá que não há mais userId e esconderá o link.
      window.location.href = "index.html"
    }
  }
}