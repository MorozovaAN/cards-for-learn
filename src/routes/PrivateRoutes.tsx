import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from './routes'

import { useTypedSelector } from 'common/hooks/useTypedSelector'

export const PrivateRoutes = () => {
  const isLoggedIn = useTypedSelector(state => state.app.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOG_IN} />
}
