import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { sortingPacksMethods } from 'common/constants/sortingMethods'

const initialState = {
  queryParams: {
    pageCount: sessionStorage.getItem('row') ? Number(sessionStorage.getItem('row')) : 5,
    page: sessionStorage.getItem('page') ? Number(sessionStorage.getItem('page')) : 1,
    min: 0,
    max: 110,
    user_id: '',
    packName: '',
    sortPacks: sortingPacksMethods.desUpdate,
  },
}

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setSearchName: (state, action: PayloadAction<string>) => {
      state.queryParams.packName = action.payload
    },
    setCardQuestion(state, action: PayloadAction<string>) {
      // state.queryParams.cardQuestion = action.payload
    },
  },
})

export const { setSearchName, setCardQuestion } = packsSlice.actions
export const packsReducer = packsSlice.reducer
