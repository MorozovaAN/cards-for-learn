import React from 'react'

import { useNavigate } from 'react-router-dom'

import error404 from 'assets/img/404.svg'
import s from 'pages/error-page/ErrorPage.module.scss'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const openHomePage = () => {
    navigate(PATH.PACKS)
  }

  return (
    <div className={s.errorContainer}>
      <div className={s.textContainer}>
        <p className={s.title}>Ooops!</p>
        <p className={s.subtitle}>Sorry! Page not found!</p>
        <Button styleType="primary" onClick={openHomePage}>
          Back to home page
        </Button>
      </div>
      <img className={s.error404Img} src={error404} alt={'404 error page'} />
    </div>
  )
}
