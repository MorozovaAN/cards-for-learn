import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  packId: '',
  packName: '',
  privatePack: false,
}

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPackInfo: (
      state,
      action: PayloadAction<{ packId?: string; packName: string; privatePack: boolean }>
    ) => {
      if (action.payload.packId) {
        state.packId = action.payload.packId
      }
      state.packName = action.payload.packName
      state.privatePack = action.payload.privatePack
    },
  },
})

export const { setPackInfo } = packsSlice.actions
export const packsReducer = packsSlice.reducer
