import React, { useEffect } from 'react'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { PacksList } from 'modules/packs/PacksList'
import { setShowButton } from 'modules/packs/packsSlise'

export const PacksPage = () => {
  const dispatch = useTypedDispatch()

  console.log('packs page')
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

  return <PacksList />
}
