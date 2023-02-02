import { RootStateType } from 'store/store'

export const errorSelector = (state: RootStateType) => state.app.error
