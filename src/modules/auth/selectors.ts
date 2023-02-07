import { RootStateType } from 'store/store'

export const currentEmailSelector = (state: RootStateType) => state.auth.email
