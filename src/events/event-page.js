import { formatEventDate } from "./events-utils.js"

export function renderEventPage(container, event) {
  const displayDate = formatEventDate(event.scheduledAt)

  container.innerHTML = `
    <div class="event-single">
      <img
        class="event-single__image"
        src="${event.image}"
        alt="${event.title}"
      >

      <h1 class="event-single__title">${event.title}</h1>

      <p class="event-single__date">${displayDate.date}</p>

      <p class="event-single__time">${displayDate.time}</p>

      <p class="event-single__description">${event.description}</p>
    </div>
  `
}
