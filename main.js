document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.js-toggle');

  const addressButton = document.querySelector('.js-address-button');
  const navigationButton = document.querySelector('.js-navigation-button');

  const addressPanel = document.querySelector('.js-address-panel');
  const navigationMenu = document.querySelector('.js-navigation-menu');

  const heroVideo = document.querySelector('.js-hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playbackRate = 0.5;
    // На iOS autoplay может не сработать без явного вызова play()
    heroVideo.play().catch(() => {});
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
