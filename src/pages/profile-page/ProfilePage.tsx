import React from 'react'

import s from './ProfilePage.module.scss'

import { Profile } from 'modules/auth/profile/Profile'
import { PATH } from 'routes/routes'
import { NavLink } from 'UI/nav-link/NavLink'

export const ProfilePage = () => {
  return (
    <div>
      <NavLink url={PATH.PACKS} styleType={'primary'}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>
      <div className={s.container}>
        <Profile />
      </div>
    </div>
  )
}
