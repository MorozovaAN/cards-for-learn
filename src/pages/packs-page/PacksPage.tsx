import React, { useEffect } from 'react'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { Packs } from 'modules'
import { setShowButton } from 'modules/packs/packsSlise'

export const PacksPage = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    const scrollHandler = () => {
      const top = window.scrollY

      if (top >= 300) {
        dispatch(setShowButton(true))
      } else {
        dispatch(setShowButton(false))
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return <Packs />
}
