import { setWindowWidth } from 'app/appSlice'
import { AppDispatchType } from 'common/hooks/useTypedDispatch'

export const resizeObserver = (dispatch: AppDispatchType) => {
  const resize = (e: UIEvent) => {
    const w = e.target as Window

    dispatch(setWindowWidth(w.innerWidth))
    window.removeEventListener('resize', resize)

    setTimeout(() => {
      dispatch(setWindowWidth(w.innerWidth))
      window.addEventListener('resize', resize)
    }, 2000)
  }

  window.addEventListener('resize', resize)
}
