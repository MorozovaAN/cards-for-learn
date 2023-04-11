import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { PATH } from './routes'

import { CardsPage } from 'pages/cards-page/CardsPage'
import { CheckEmailPage } from 'pages/check-email-page/CheckEmailPage'
import { ErrorPage } from 'pages/error-page/ErrorPage'
import { ForgotPasswordPage } from 'pages/forgot-password-page/ForgotPasswordPage'
import { LearnCardsPage } from 'pages/learn-cards-page/LearnCardsPage'
import { LogInPage } from 'pages/log-in-page/LogInPage'
import { LogUpPage } from 'pages/log-up-page/LogUpPage'
import { NewPasswordPage } from 'pages/new-password-page/NewPasswordPage'
import { PacksPage } from 'pages/packs-page/PacksPage'
import { ProfilePage } from 'pages/profile-page/ProfilePage'
import { PrivateAuthRoutes } from 'routes/PrivateAuthRoutes'

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<ProfilePage />} />
        <Route path={PATH.PACKS} element={<PacksPage />} />
        <Route path={PATH.CARDS} element={<CardsPage />} />
        <Route path={PATH.MY_PACKS} element={<PacksPage />} />
        <Route path={PATH.LEARN_CARDS} element={<LearnCardsPage />} />
      </Route>

      <Route element={<PrivateAuthRoutes />}>
        <Route path={PATH.MAIN} element={<Navigate to={PATH.LOG_IN} />} />
        <Route path={PATH.LOG_IN} element={<LogInPage />} />
        <Route path={PATH.LOG_UP} element={<LogUpPage />} />
        <Route path={PATH.PASS_RECOVERY} element={<ForgotPasswordPage />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmailPage />} />
        <Route path={PATH.SET_NEW_PASS} element={<NewPasswordPage />} />
      </Route>

      <Route path={PATH.ERROR_404} element={<ErrorPage />} />
      <Route path={PATH.NOT_FOUND} element={<Navigate to={PATH.ERROR_404} />} />
    </Routes>
  )
}
