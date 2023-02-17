import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { authApi, authReducer, packsReducer, packsApi, cardsApi } from 'modules'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [packsApi.reducerPath]: packsApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, packsApi.middleware, cardsApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>
