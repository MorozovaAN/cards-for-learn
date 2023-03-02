import React, { useEffect, useState } from 'react'

import { ReactComponent as ArrowUp } from 'assets/img/icons/arrow-up.svg'
import scroll from 'components/btnScrollUp/BtnScrollUp.module.scss'
import { Button } from 'UI/button/Button'

export const BtnScrollUp = () => {
  const [btnScrollUp, setBtnScrollUp] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      const top = window.scrollY

      if (top >= 300) {
        setBtnScrollUp(true)
      } else {
        setBtnScrollUp(false)
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <>
      {btnScrollUp && (
        <Button
          className={scroll.scrollBtn}
          styleType="icon"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <ArrowUp width="19" height="23" />
        </Button>
      )}
    </>
  )
}
