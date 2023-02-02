import { RootStateType } from 'store/store'

export const errorSelector = (state: RootStateType) => state.app.error
export const isLoggedInSelector = (state: RootStateType) => state.app.isLoggedIn
