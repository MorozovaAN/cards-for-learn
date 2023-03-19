import { useLayoutEffect, useState } from 'react'

export const resizeObserver = () => {
  const [size, setSize] = useState(0)

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
