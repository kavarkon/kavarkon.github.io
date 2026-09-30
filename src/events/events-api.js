const apiBase = (import.meta.env.VITE_API_BASE || "https://api.templebar.ru").replace(/\/$/, "")

export async function loadEvents() {
  const response = await fetch(`${apiBase}/events`)

  if (!response.ok) {
    throw new Error("Не удалось загрузить мероприятия")
  }

  const events = await response.json()

  if (!Array.isArray(events)) {
    throw new Error("API вернуло некорректный список мероприятий")
  }

  return events.map(normalizeEvent)
}

function normalizeEvent(event) {
  return {
    id: event.id,
    title: event.title,
    scheduledAt: event.scheduledAt,
    description: event.description || "",
    image: event.imageUrl ? new URL(event.imageUrl, `${apiBase}/`).href : "",
  }
}
