import { RootStateType } from 'store/store'

export const emailSelector = (state: RootStateType) => state.auth.email
export const nameSelector = (state: RootStateType) => state.auth.name
export const avatarSelector = (state: RootStateType) => state.auth.avatar
export const clickAwaySelector = (state: RootStateType) => state.auth.clickAway
