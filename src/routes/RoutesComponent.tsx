import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PATH } from './routes'

import { Packs } from 'modules/packs/Packs'
import { CheckEmailPage } from 'pages/check-email/CheckEmailPage'
import { ErrorPage } from 'pages/error-page/ErrorPage'
import { ForgotPasswordPage } from 'pages/forgot-password-page/ForgotPasswordPage'
import { LogInPage } from 'pages/log-in-page/LogInPage'
import { LogUpPage } from 'pages/log-up-page/LogUpPage'
import { NewPasswordPage } from 'pages/new-password-page/newPasswordPage'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        {/*  <Route path={PATH.PROFILE} element={<Profile />} />*/}
        <Route path={PATH.PACKS} element={<Packs />} />
        {/*  <Route path={PATH.CARDS} element={<Cards />} />*/}
        {/*  <Route path={PATH.CARD} element={<LearnCard />} />*/}
      </Route>

      <Route path={PATH.MAIN} element={<Navigate to={PATH.LOG_IN} />} />
      <Route path={PATH.LOG_IN} element={<LogInPage />} />
      <Route path={PATH.LOG_UP} element={<LogUpPage />} />
      <Route path={PATH.PASS_RECOVERY} element={<ForgotPasswordPage />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmailPage />} />
      <Route path={PATH.SET_NEW_PASS} element={<NewPasswordPage />} />
      <Route path={PATH.ERROR_404} element={<ErrorPage />} />
      <Route path={PATH.NOT_FOUND} element={<Navigate to={PATH.ERROR_404} />} />
    </Routes>
  )
}
