import { RootStateType } from 'store/store'

export const isAuthSelector = (state: RootStateType) => state.app.isAuth
export const isLoggedInSelector = (state: RootStateType) => state.app.isLoggedIn
export const isLoadingSelector = (state: RootStateType) => state.app.isLoading
export const successSelector = (state: RootStateType) => state.app.success
export const errorSelector = (state: RootStateType) => state.app.error
