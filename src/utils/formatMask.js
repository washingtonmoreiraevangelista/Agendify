export function formatPhoneNumber(value) {
  if (!value) return ""

  //remove tudo que não e numero
  value = value.replace(/\D/g, "")

  //Aplica a formatação (xx) xxxx-xxxx
  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d{4,5})(\d{4})$/, "$1-$2")

  return value

}

