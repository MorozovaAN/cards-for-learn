import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Response } from 'modules/auth/authApi'

const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
  name: 'My name',
  avatar: '',
  id: null as null | string,
  clickAway: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Response | undefined>) => {
      if (action.payload) {
        state.email = action.payload.email
        state.id = action.payload._id
        state.avatar = action.payload.avatar
        action.payload.email === action.payload.name
          ? (state.name = `user${action.payload._id}`)
          : (state.name = action.payload.name)
      }
    },
    forgotPasswordCurrentEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setClickAway: (state, action: PayloadAction<boolean>) => {
      state.clickAway = action.payload
    },
  },
})

export const { setAuthData, forgotPasswordCurrentEmail, setClickAway } = authSlice.actions
export const authReducer = authSlice.reducer
