import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowButtonScroll: false,
  packId: '',
  showAddPackModal: false,
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
    setShowAddPackModal: (state, action: PayloadAction<boolean>) => {
      state.showAddPackModal = action.payload
    },
  },
})

export const { setShowButton, setPackId, setShowAddPackModal } = packsSlice.actions
export const packsReducer = packsSlice.reducer
