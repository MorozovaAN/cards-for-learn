export const calcScrollWidth = () => {
  const scroll = document.createElement('div')

  scroll.id = 'scrollId'
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  scroll.style.width = `${String(scrollbarWidth)}px`

  return scroll
}
