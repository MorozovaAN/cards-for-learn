import React, { useEffect, useState } from 'react'

import { Packs } from 'modules'

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

  return <Packs toggle={toggle} />
}
