import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowButtonScroll: false,
  packId: '',
  showAddPackModal: false,
  showEditNamePackModal: false,
  currentPackName: '',
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
    setShowEditNamePackModal: (state, action: PayloadAction<boolean>) => {
      state.showEditNamePackModal = action.payload
    },
    setCurrentPackName: (state, action: PayloadAction<string>) => {
      state.currentPackName = action.payload
    },
  },
})

export const {
  setShowButton,
  setPackId,
  setShowAddPackModal,
  setShowEditNamePackModal,
  setCurrentPackName,
} = packsSlice.actions
export const packsReducer = packsSlice.reducer
