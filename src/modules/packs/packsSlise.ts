import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowButtonScroll: false,
  packId: '',
  name: '',
}

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setShowButton: (state, action: PayloadAction<boolean>) => {
      state.isShowButtonScroll = action.payload
    },
    setPackId: (state, action: PayloadAction<string>) => {
      state.packId = action.payload
    },
    setPackName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const { setShowButton, setPackId, setPackName } = packsSlice.actions
export const packsReducer = packsSlice.reducer
