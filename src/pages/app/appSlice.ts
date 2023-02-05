import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  isLoggedIn: false,
  isLoading: false,
  error: '',
  success: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuth: state => {
      state.isAuth = true
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload
    },
  },
})

export const { setIsAuth, setIsLoggedIn, setError, setSuccess, setIsLoading } = appSlice.actions
export const appReducer = appSlice.reducer
