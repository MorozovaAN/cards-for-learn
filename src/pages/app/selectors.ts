import { RootStateType } from 'store/store'

export const isLoggedInSelector = (state: RootStateType) => state.app.isLoggedIn
