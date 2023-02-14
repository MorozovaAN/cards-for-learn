import React from 'react'

import { Button } from 'UI/button/Button'

export const ButtonScroll = () => {
  const handlerScrollUp = () => {
    //для плавного поднимания вверх
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <Button styleType="primary" onClick={handlerScrollUp}>
        Scroll me Up
      </Button>
    </div>
  )
}
