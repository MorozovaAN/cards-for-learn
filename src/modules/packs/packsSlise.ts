import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowButtonScroll: false,
  packId: '',
  packName: '',
  privateCheck: false,
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
      state.packName = action.payload
    },
    setPrivateCheckbox: (state, action: PayloadAction<boolean>) => {
      state.privateCheck = action.payload
    },
  },
})

export const { setShowButton, setPackId, setPackName, setPrivateCheckbox } = packsSlice.actions
export const packsReducer = packsSlice.reducer
