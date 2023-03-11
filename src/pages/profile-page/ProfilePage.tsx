import React from 'react'

import s from './ProfilePage.module.scss'

import { Profile } from 'modules'
import { PATH } from 'routes/routes'
import { NavLink } from 'UI/nav-link/NavLink'

export const ProfilePage = () => {
  return (
    <div className={s.profilePage}>
      <div className={s.contentContainer}>
        <Profile />
      </div>
    </div>
  )
}
