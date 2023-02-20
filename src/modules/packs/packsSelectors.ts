import { RootStateType } from 'store/store'

export const packIdSelector = (state: RootStateType) => state.packs.packId
export const packNameSelector = (state: RootStateType) => state.packs.packName
