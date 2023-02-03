import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from './routes'

import { useTypedSelector } from 'hooks/useTypedSelector'
import { isLoggedInSelector } from 'pages/app/selectors'

export const PrivateRoutes = () => {
  const isAuth = useTypedSelector(isLoggedInSelector)

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOG_IN} />
}
