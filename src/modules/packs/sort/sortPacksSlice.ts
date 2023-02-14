import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { sortingPacksMethods } from 'common/constants/sortingMethods'

const initialState = {
  sortPacksLabel: 'cards count',
}

const sortPacksSlice = createSlice({
  name: 'sortPacks',
  initialState,
  reducers: {
    setSortLabel: (state, action: PayloadAction<string>) => {
      const value = action.payload

      if (value === sortingPacksMethods.desName || value === sortingPacksMethods.ascName) {
        state.sortPacksLabel = 'other-pack name'

        return
      }
      if (
        value === sortingPacksMethods.ascCardsCount ||
        value === sortingPacksMethods.desCardsCount
      ) {
        state.sortPacksLabel = 'cards count'

        return
      }
      if (value === sortingPacksMethods.ascUpdate || value === sortingPacksMethods.desUpdate) {
        state.sortPacksLabel = 'latest update'

        return
      }
      if (value === sortingPacksMethods.desUserName || value === sortingPacksMethods.ascUserName) {
        state.sortPacksLabel = 'creator name'

        return
      }
    },
  },
})

export const { setSortLabel } = sortPacksSlice.actions
export const sortPacksReducer = sortPacksSlice.reducer
