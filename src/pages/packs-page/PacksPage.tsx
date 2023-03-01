import React, { useEffect, useState } from 'react'

import s from './PacksPage.module.scss'

import { ReactComponent as ArrowUp } from 'assets/img/icons/arrow-up.svg'
import { Packs } from 'modules'
import { Button } from 'UI/button/Button'

export const PacksPage = () => {
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
      <Packs />

      {btnScrollUp && (
        <Button
          className={s.scrollBtn}
          styleType="icon"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <ArrowUp width="19" height="23" />
        </Button>
      )}
    </>
  )
}
