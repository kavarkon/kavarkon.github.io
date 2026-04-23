document.addEventListener('DOMContentLoaded', () => {
  function setInitialViewportHeight() {
    const h = window.innerHeight;
    document.documentElement.style.setProperty('--initial-vh', `${h}px`);
    document.documentElement.style.setProperty('--initial-vh-unit', `${h * 0.01}px`);
  }

  setInitialViewportHeight();
});
