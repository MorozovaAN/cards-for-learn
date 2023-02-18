import React, { FC, useEffect, useRef } from 'react'

interface ClickAwayListenerType {
  onClickAway: () => void
  children: React.ReactElement
}

export const ClickAwayListener: FC<ClickAwayListenerType> = ({ onClickAway, children }) => {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      const eventTarget = event.target as Node
      const isClickInside = rootRef.current?.contains(eventTarget)

      if (!isClickInside) onClickAway()
    }

    window.addEventListener('click', handleClickAway)

    return () => {
      window.removeEventListener('click', handleClickAway)
    }
  }, [rootRef])

  return <div ref={rootRef}>{children}</div>
}
