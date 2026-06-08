export async function loadEvents() {
  const response = await fetch('/events.json');

  if (!response.ok) {
    throw new Error('Не удалось загрузить мероприятия');
  }

  return response.json();
}
