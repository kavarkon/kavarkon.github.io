import { loadEvents } from './events-api.js';
import { formatEventDate } from './events-utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  function setInitialViewportHeight() {
    const h = window.innerHeight;

    document.documentElement.style.setProperty('--initial-vh', `${h}px`);

    document.documentElement.style.setProperty(
      '--initial-vh-unit',
      `${h * 0.01}px`
    );
  }

  setInitialViewportHeight();

  const container = document.querySelector('.content');

  const events = await loadEvents();

  const eventId = getEventIdFromUrl();

  setupBackButton(eventId);

  if (eventId) {
    document.body.classList.add('event-single-page');
  }

  if (eventId) {
    const event = events.find(e => e.id == eventId);

    if (!event) {
      container.textContent = 'Событие не найдено';
      return;
    }

    renderSingleEvent(container, event);
  } else {
    renderEventsList(events);
  }
});



function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return params.get('id');
}





function renderSingleEvent(container, event) {
  container.innerHTML = `
    <div class="event-single">
      <img
        src="${event.image}"
        alt="${event.title}"
      >

      <h1>${event.title}</h1>

      <p>${event.date} ${event.time}</p>

      <p>${event.description}</p>
    </div>
  `;
}

function setupBackButton(eventId) {
  const backBtn = document.querySelector('.header__cancel-button');

  if (!backBtn) return;

  if (eventId) {
    backBtn.href = '/events.html';
  } else {
    backBtn.href = '/';
  }
}
