import React from 'react'

import s from './ProfilePage.module.scss'

import { Profile } from 'modules'

export const ProfilePage = () => {
  return (
    <div className={s.profilePage}>
      <div className={s.contentContainer}>
        <Profile />
      </div>
    </div>
  )
}
