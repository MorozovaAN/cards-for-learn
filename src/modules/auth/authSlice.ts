import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Response } from 'modules/auth/authApi'

const initialState = {
  email: '' as null | string,
  password: '' as null | string,
  rememberMe: true,
  name: 'My name',
  avatar: '',
  id: null as null | string,
  currentEmail: '',
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
      }
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    forgotPasswordCurrentEmail(state, action: PayloadAction<string>) {
      state.currentEmail = action.payload
    },
  },
})

export const { setAuthData, setName, forgotPasswordCurrentEmail } = authSlice.actions
export const authReducer = authSlice.reducer
