import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowUp } from 'assets/img/icons/arrow-up.svg'
import { Cards } from 'modules/cards/Cards'
import scroll from 'modules/packs/Packs.module.scss'
import { Button } from 'UI/button/Button'

export const CardsPage = () => {
  const navigate = useNavigate()
  const [toggleBtn, setToggleBtn] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      const top = window.scrollY

      if (top >= 300) {
        setToggleBtn(true)
      } else {
        setToggleBtn(false)
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <div>
      {/*<NavLink url={PATH.PACKS}>*/}
      {/*  <p>&lArr; Back to Packs List</p>*/}
      {/*</NavLink>*/}

      <div onClick={() => navigate(-1)}>
        <p>&lArr; Back to Pack List</p>
      </div>

      <Cards />

      {toggleBtn && (
        <Button
          className={scroll.scrollBtn}
          styleType="icon"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <ArrowUp width="19" height="23" />
        </Button>
      )}
    </div>
  )
}
