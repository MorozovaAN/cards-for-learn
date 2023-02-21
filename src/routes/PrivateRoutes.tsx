import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from './routes'

import { isLoggedInSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'

export const PrivateRoutes = () => {
  const isLoggedIn = useTypedSelector(isLoggedInSelector)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOG_IN} />
}
