import { RootStateType } from 'store/store'

export const isAuthSelector = (state: RootStateType) => state.app.isAuth
export const isLoggedInSelector = (state: RootStateType) => state.app.isLoggedIn
export const isLoadingSelector = (state: RootStateType) => state.app.isLoading
export const notificationSelector = (state: RootStateType) => state.app.notification
export const modalSelector = (state: RootStateType) => state.app.modal
