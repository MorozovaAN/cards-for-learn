import { useEffect, useState } from 'react'

import { useTypedSelector } from './useTypedSelector'

import { setWindowWidth } from 'app/appSlice'

export const resizeObserver = () => {
  // const windowWidth = useTypedSelector(state => state.app.windowWidth)
  // const app = document.querySelector('#id')
  //
  // function updateSize() {
  //   console.log('updateSize')
  //   if (windowWidth !== Number(app?.clientWidth)) {
  //     console.log('in if')
  //     setWindowWidth(Number(app?.clientWidth))
  //     app?.removeEventListener('resize', updateSize)
  //
  //     setTimeout(() => {
  //       app?.addEventListener('resize', updateSize)
  //     }, 1000)
  //   }
  // }
  //
  // app?.addEventListener('resize', updateSize)
}
