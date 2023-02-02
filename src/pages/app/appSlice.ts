import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { error: null as null | string },
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setError } = appSlice.actions
export const appReducer = appSlice.reducer
