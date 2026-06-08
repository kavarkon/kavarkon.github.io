import { formatEventDate } from './events-utils.js';

export function renderSlider(events) {
  const track = document.querySelector('.events-slider__track');

  if (!track) return;

  track.innerHTML = '';

  events.forEach((event, index) => {
    const card = document.createElement('a');

    card.className = 'event-card';

    card.dataset.title = event.title;

    card.dataset.displayDate = formatEventDate(
      event.date,
      event.time
    );

    if (index === 0) {
      card.classList.add('active');
    }

    card.href = `/events.html?id=${event.id}`;

    card.innerHTML = `
      <img
        class="event-card__image"
        src="${event.image}"
        alt="${event.title}"
      >
    `;

    track.appendChild(card);
  });

  setupSlider();
}
