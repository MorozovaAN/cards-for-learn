import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { authReducer } from 'modules'
import { authApi } from 'modules/auth/authApi'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>
