import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Response } from 'modules/auth/authApi'

const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
  name: 'My name',
  avatar: '',
  id: null as null | string,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Response | undefined>) => {
      if (action.payload) {
        state.email = action.payload.email
        state.id = action.payload._id
        state.name = action.payload.name
        state.avatar = action.payload.avatar
      }
    },
  },
})

export const { setAuthData } = authSlice.actions
export const authReducer = authSlice.reducer
