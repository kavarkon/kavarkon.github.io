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
