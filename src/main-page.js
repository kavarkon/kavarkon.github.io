export function initializeViewportHeight() {
  const height = window.innerHeight

  document.documentElement.style.setProperty("--initial-vh", `${height}px`)
  document.documentElement.style.setProperty("--initial-vh-unit", `${height * 0.01}px`)
}

export function initializeHeader() {
  const buttons = document.querySelectorAll(".js-toggle")
  const addressButton = document.querySelector(".js-address-button")
  const navigationButton = document.querySelector(".js-navigation-button")
  const addressPanel = document.querySelector(".js-address-panel")
  const navigationMenu = document.querySelector(".js-navigation-menu")

  if (!addressPanel || !navigationMenu) return

  const setIcon = (button, isActive) => {
    button.src = isActive ? button.dataset.active : button.dataset.default
  }

  const closeAll = (exceptButton = null) => {
    buttons.forEach((button) => {
      if (button !== exceptButton && button.classList.contains("_active")) {
        button.classList.remove("_active")
        setIcon(button, false)
      }
    })

    addressPanel.classList.remove("_active")
    navigationMenu.classList.remove("_active")
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".js-toggle")

    if (!button) {
      closeAll()
      return
    }

    const isActive = button.classList.toggle("_active")
    setIcon(button, isActive)

    closeAll(button)

    if (button === addressButton && isActive) {
      addressPanel.classList.add("_active")
    }

    if (button === navigationButton && isActive) {
      navigationMenu.classList.add("_active")
    }
  })
}

export function initializeFoodMenuModal() {
  const modal = document.querySelector(".menu__modal")
  const openButton = document.querySelector(".menu__modal__open")
  const closeButton = document.querySelector(".menu__modal__cancel")

  if (!modal) return

  const showModal = () => {
    modal.classList.add("menu__modal--visible")
    document.body.classList.add("body--locked")
  }

  const hideModal = () => {
    modal.classList.remove("menu__modal--visible")
    document.body.classList.remove("body--locked")
  }

  openButton?.addEventListener("click", showModal)
  closeButton?.addEventListener("click", hideModal)
}

export function initializeBarMenu() {
  const modal = document.querySelector(".bar-menu__modal")
  const openButton = document.querySelector(".bar-menu__modal__open")
  const closeButton = document.querySelector(".bar-menu__modal__cancel")

  if (!modal) return

  const showModal = () => {
    modal.classList.add("bar-menu__modal--visible")
    document.body.classList.add("body--locked")
  }

  const hideModal = () => {
    modal.classList.remove("bar-menu__modal--visible")
    document.body.classList.remove("body--locked")
  }

  openButton?.addEventListener("click", showModal)
  closeButton?.addEventListener("click", hideModal)
}

export function initializeBarMenuVideo() {
  const video = document.querySelector(".js-hero-video")

  if (!video) return

  video.muted = true
  video.playbackRate = 0.5
}
