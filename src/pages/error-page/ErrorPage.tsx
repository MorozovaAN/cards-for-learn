import React from 'react'

import s from './ErrorPage.module.scss'

import error404 from 'assets/img/404.svg'
import { PATH } from 'routes/routes'
import { NavLink } from 'UI/nav-link/NavLink'

export const ErrorPage = () => {
  return (
    <div className={s.errorContainer}>
      <div className={s.textContainer}>
        <p className={s.title}>Ooops!</p>
        <p className={s.subtitle}>Sorry, page not found!</p>
        <NavLink url={PATH.PACKS} styleType="button" className={s.button}>
          Back to home page
        </NavLink>
      </div>

      <div className={s.errorImgContainer}>
        <img className={s.errorImg} src={error404} alt="page error 404" />
      </div>
    </div>
  )
}
