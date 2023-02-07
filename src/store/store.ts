import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { authApi } from 'modules/auth/authApi'
import { authReducer } from 'modules/auth/authSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>
