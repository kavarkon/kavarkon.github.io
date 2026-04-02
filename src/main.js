document.addEventListener('DOMContentLoaded', () => {
  function setInitialViewportHeight() {
    const h = window.innerHeight;
    document.documentElement.style.setProperty('--initial-vh', `${h}px`);
    document.documentElement.style.setProperty('--initial-vh-unit', `${h * 0.01}px`);
  }

  setInitialViewportHeight();

  const buttons = document.querySelectorAll('.js-toggle');

  const addressButton = document.querySelector('.js-address-button');
  const navigationButton = document.querySelector('.js-navigation-button');

  const addressPanel = document.querySelector('.js-address-panel');
  const navigationMenu = document.querySelector('.js-navigation-menu');

  const heroVideo = document.querySelector('.js-hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playbackRate = 0.5;
  }

  function setIcon(button, isActive) {
    const icon = button.querySelector('img');
    icon.src = isActive ? icon.dataset.active : icon.dataset.default;
  }

  function setIcon(button, isActive) {
    button.src = isActive ? button.dataset.active : button.dataset.default;
  }

  function closeAll(exceptButton = null) {
    buttons.forEach(button => {
      if (button !== exceptButton && button.classList.contains('_active')) {
        button.classList.remove('_active');
        setIcon(button, false);
      }
    });

    addressPanel.classList.remove('_active');
    navigationMenu.classList.remove('_active');
  }

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.js-toggle');

    if (!button) {
      closeAll();
      return;
    }

    const isActive = button.classList.toggle('_active');
    setIcon(button, isActive);

    closeAll(button);

    if (button === addressButton && isActive) {
      addressPanel.classList.add('_active');
    }

    if (button === navigationButton && isActive) {
      navigationMenu.classList.add('_active');
    }
  });

  const menuModal = document.querySelector('.menu__modal');
  const menuModalOpenButton = document.querySelector('.menu__modal__open');
  const menuModalCloseButton = document.querySelector('.menu__modal__cancel');

  function showModal() {
    menuModal.classList.add('menu__modal--visible');
    document.body.classList.add('body--locked');
  }

  function hideModal() {
    menuModal.classList.remove('menu__modal--visible');
    document.body.classList.remove('body--locked');
  }

  if (menuModalOpenButton && menuModal) {
    menuModalOpenButton.addEventListener('click', showModal);
  }

  if (menuModalCloseButton && menuModal) {
    menuModalCloseButton.addEventListener('click', hideModal);
  }

  const barMenuModal = document.querySelector('.bar-menu__modal');
  const barMenuModalOpenButton = document.querySelector('.bar-menu__modal__open');
  const barMenuModalCloseButton = document.querySelector('.bar-menu__modal__cancel');

  function showBarModal() {
    barMenuModal.classList.add('bar-menu__modal--visible');
    document.body.classList.add('body--locked');
  }

  function hideBarModal() {
    barMenuModal.classList.remove('bar-menu__modal--visible');
    document.body.classList.remove('body--locked');
  }

  if (barMenuModalOpenButton && barMenuModal) {
    barMenuModalOpenButton.addEventListener('click', showBarModal);
  }

  if (barMenuModalCloseButton && barMenuModal) {
    barMenuModalCloseButton.addEventListener('click', hideBarModal);
  }
});
