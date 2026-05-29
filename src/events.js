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

    initSlider();
  }
});

async function loadEvents() {
  const res = await fetch('/events.json');

  return res.json();
}

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return params.get('id');
}

function formatEventDate(dateString, timeString) {
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString('ru-RU', {
    weekday: 'long'
  });

  const dayMonth = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  });

  return `${weekday} [${dayMonth}]\n${timeString}`;
}

function renderEventsList(events) {
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

function setupSlider() {
  const slider = document.querySelector('.events-slider');

  const cards = document.querySelectorAll('.event-card');

  const title = document.querySelector('.event-details__title');

  const date = document.querySelector('.event-details__date');

  if (!slider || !cards.length) return;

  function updateActiveCard() {
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;

      const distance = Math.abs(sliderCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    cards.forEach(card => {
      card.classList.remove('active');
    });

    if (closestCard) {
      closestCard.classList.add('active');

      title.textContent = closestCard.dataset.title;
      date.innerHTML = closestCard.dataset.displayDate.replace('\n', '<br>');
    }
  }

  slider.addEventListener('scroll', updateActiveCard);

  updateActiveCard();
}

function initSlider() {
  const slider = document.querySelector('.events-slider');

  if (!slider) return;

  const cards = document.querySelectorAll('.event-card');

  function updateActiveCard() {
    const center = window.innerWidth / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();

      const cardCenter = rect.left + rect.width / 2;

      const distance = Math.abs(center - cardCenter);

      if (distance < rect.width * 0.4) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  slider.addEventListener('scroll', updateActiveCard);

  window.addEventListener('resize', updateActiveCard);

  updateActiveCard();
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
