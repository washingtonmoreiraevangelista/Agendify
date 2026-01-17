export function showMessage(text, type = "success") {
  const message = document.getElementById("form-message")
  if (!message) return

  message.textContent = text
  message.className = `form-message ${type}`

  setTimeout(() => {
    message.textContent = ""
    message.className = "form-message"
  }, 8000)
}
