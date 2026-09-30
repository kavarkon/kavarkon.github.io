export function formatEventDate(scheduledAt) {
  const date = new Date(scheduledAt)

  if (Number.isNaN(date.getTime())) {
    throw new Error("Некорректная дата мероприятия")
  }

  const weekday = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    timeZone: "Europe/Moscow",
  }).format(date)

  const dayMonth = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  }).format(date)

  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(date)

  return {
    date: `${weekday} [${dayMonth}]`,
    time,
  }
}
