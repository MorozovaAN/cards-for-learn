import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowButtonScroll: false,
  packId: '',
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
  },
})

export const { setShowButton, setPackId } = packsSlice.actions
export const packsReducer = packsSlice.reducer
