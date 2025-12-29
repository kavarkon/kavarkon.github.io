document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.js-toggle');

  const addressButton = document.querySelector('.js-address-button');
  const navigationButton = document.querySelector('.js-navigation-button');

  const addressPanel = document.querySelector('.js-address-panel');
  const navigationMenu = document.querySelector('.js-navigation-menu');

  function setIcon(button, isActive) {
    const icon = button.querySelector('img');
    icon.src = isActive ? icon.dataset.active : icon.dataset.default;
  }

  function closeAll(exceptButton = null) {
    // выключаем кнопки (кроме exceptButton)
    buttons.forEach(button => {
      if (button !== exceptButton && button.classList.contains('_active')) {
        button.classList.remove('_active');
        setIcon(button, false);
      }
    });

    // скрываем панели
    addressPanel.classList.remove('_active');
    navigationMenu.classList.remove('_active');
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.js-toggle');

    // клик вне кнопок
    if (!button) {
      closeAll();
      return;
    }

    // переключаем текущую кнопку
    const isActive = button.classList.toggle('_active');
    setIcon(button, isActive);

    // закрываем всё остальное
    closeAll(button);

    // показываем нужный блок, если кнопка активна
    if (button === addressButton && isActive) {
      addressPanel.classList.add('_active');
    }

    if (button === navigationButton && isActive) {
      navigationMenu.classList.add('_active');
    }
  });
});
