import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '../modules/auth/authApi'
import { appReducer } from '../pages/app/appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>
