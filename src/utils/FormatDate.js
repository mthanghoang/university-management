export default function FormatDate(dateString) {
  // Split the date string into day, month, and year parts
  const [day, month, year] = dateString.split('/')

  // Swap day and month parts and join them back together
  const reversedDateString = `${month}/${day}/${year}`

  return reversedDateString
}