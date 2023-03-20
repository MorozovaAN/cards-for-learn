import { useEffect, useRef } from 'react'

import { setWindowWidth } from 'app/appSlice'
import { AppDispatchType } from 'common/hooks/useTypedDispatch'

export const resizeObserver = (dispatch: AppDispatchType) => {
  const value = useRef()

  useEffect(() => {
    const resize = (e: any) => {
      value.current = e.currentTarget.innerWidth
      value.current === 800 && dispatch(setWindowWidth(800))
      value.current === 802 && dispatch(setWindowWidth(802))
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])
}
