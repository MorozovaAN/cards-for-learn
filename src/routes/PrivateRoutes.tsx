import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { isLoggedInSelector } from '../pages/app/selectors'

import { PATH } from './routes'

export const PrivateRoutes = () => {
  const isAuth = useTypedSelector(isLoggedInSelector)

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOG_IN} />
}
