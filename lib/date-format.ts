const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export function formatIssueDate(date: Date) {
  return dateFormatter.format(date)
}

export function formatIssueRange(startDate: Date, endDate: Date) {
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()

  const startMonth = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
  }).format(startDate)

  const endMonth = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
  }).format(endDate)

  const year = endDate.getFullYear()

  if (startMonth === endMonth) {
    return `${startDay}–${endDay} ${endMonth} ${year}`
  }

  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${year}`
}
