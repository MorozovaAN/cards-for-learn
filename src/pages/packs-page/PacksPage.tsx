import React, { useEffect, useState } from 'react'

import { ReactComponent as ArrowUp } from 'assets/img/icons/arrow-up.svg'
import { Packs } from 'modules'
import s from 'modules/packs/Packs.module.scss'
import { Button } from 'UI/button/Button'

export const PacksPage = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      const top = window.scrollY

      if (top >= 300) {
        setToggle(true)
      } else {
        setToggle(false)
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <>
      <Packs />

      {toggle && (
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
