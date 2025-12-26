document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.js-toggle');

  function resetButtons(except = null) {
    buttons.forEach(button => {
      if (button !== except && button.classList.contains('_active')) {
        const icon = button.querySelector('img');
        button.classList.remove('_active');
        icon.src = icon.dataset.default;
      }
    });
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.js-toggle');

    // Клик вне кнопок
    if (!button) {
      resetButtons();
      return;
    }

    // Клик по кнопке
    const icon = button.querySelector('img');
    const isActive = button.classList.toggle('_active');

    resetButtons(button);

    icon.src = isActive
      ? icon.dataset.active
      : icon.dataset.default;
  });
});
