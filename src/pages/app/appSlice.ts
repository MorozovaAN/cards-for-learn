import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { isAuth: false, isLoggedIn: false },
  reducers: {
    setIsAuth: state => {
      state.isAuth = true
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setIsAuth, setIsLoggedIn } = appSlice.actions
export const appReducer = appSlice.reducer
