import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isShowButtonScroll: false,
  packId: '',
  packName: '',
  privatePack: false,
}

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setShowButton: (state, action: PayloadAction<boolean>) => {
      state.isShowButtonScroll = action.payload
    },

    setPackInfo: (
      state,
      action: PayloadAction<{ packId: string; packName: string; privatePack: boolean }>
    ) => {
      state.packId = action.payload.packId
      state.packName = action.payload.packName
      state.privatePack = action.payload.privatePack
    },
  },
})

export const { setShowButton, setPackInfo } = packsSlice.actions
export const packsReducer = packsSlice.reducer
