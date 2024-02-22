export default function FormatDate(dateString) {
  if (dateString) {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-indexed, so we add 1
    const year = date.getFullYear()
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
  }
  return dateString
}