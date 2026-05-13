export function forceScrollTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  const main = document.querySelector('main')
  if (main instanceof HTMLElement) {
    main.scrollTop = 0
    main.focus({ preventScroll: true })
  }
}

export function forceScrollTopAfterRender() {
  forceScrollTop()

  window.requestAnimationFrame(() => {
    forceScrollTop()

    window.requestAnimationFrame(() => {
      forceScrollTop()
    })
  })

  window.setTimeout(forceScrollTop, 50)
  window.setTimeout(forceScrollTop, 150)
}
