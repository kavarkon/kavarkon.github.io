import {
  initializeBarMenu,
  initializeBarMenuVideo,
  initializeFoodMenuModal,
  initializeHeader,
  initializeViewportHeight,
} from "./main-page.js"

document.addEventListener("DOMContentLoaded", () => {
  initializeViewportHeight()
  initializeHeader()
  initializeFoodMenuModal()
  initializeBarMenu()
  initializeBarMenuVideo()
})
