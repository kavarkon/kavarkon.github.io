document.addEventListener('DOMContentLoaded', () => {

  let lastInnerHeight = 0;

  function setVh(force = false) {
    const h = window.innerHeight;

    // iOS дергает resize из-за адресной строки — игнорируем мелкие изменения
    if (!force && lastInnerHeight && Math.abs(h - lastInnerHeight) < 80) return;

    lastInnerHeight = h;
    document.documentElement.style.setProperty('--vh', `${h * 0.01}px`);
  }

  setVh(true);

  window.addEventListener('orientationchange', () => setVh(true));
  window.addEventListener('resize', () => setVh(false));

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

});
