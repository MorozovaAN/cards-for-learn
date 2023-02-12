import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { authReducer, authApi } from 'modules'
import { packsApi } from 'modules/packs/packsApi'
import { packsReducer } from 'modules/packs/packsSlise'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [packsApi.reducerPath]: packsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, packsApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>
