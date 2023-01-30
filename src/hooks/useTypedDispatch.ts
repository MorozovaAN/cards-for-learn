import { useDispatch } from 'react-redux'

import { store } from '../store/store'

export type AppDispatchType = typeof store.dispatch
export const useTypedDispatch = () => useDispatch<AppDispatchType>()
