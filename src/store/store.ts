import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { sortPacksReducer } from 'components/sort/sortPacksSlice'
import { authReducer, authApi } from 'modules'
import { packsApi } from 'modules/packs/packsApi'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    sortPacks: sortPacksReducer,
    [authApi.reducerPath]: authApi.reducer,
    [packsApi.reducerPath]: packsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, packsApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>
