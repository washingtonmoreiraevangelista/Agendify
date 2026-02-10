export function formatPhoneNumber(value) {
  if (!value) return ""

  //remove tudo que não e numero
  value = value.replace(/\D/g, "").substring(0, 11)

  //Aplica a formatação (xx) xxxx-xxxx
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")

  return value

}

