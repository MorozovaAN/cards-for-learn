import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  cardId: '',
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardId: (state, action: PayloadAction<string>) => {
      state.cardId = action.payload
    },
  },
})

export const { setCardId } = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
