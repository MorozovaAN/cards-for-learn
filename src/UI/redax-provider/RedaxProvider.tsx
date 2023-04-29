import React, { FC, ReactNode } from 'react'

import { Provider } from 'react-redux'

import { store } from '../../store/store'

type ReduxProviderType = {
  children: ReactNode
}

export const ReduxProvider: FC<ReduxProviderType> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
