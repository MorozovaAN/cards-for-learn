import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootStateType } from '../store/store'

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector
