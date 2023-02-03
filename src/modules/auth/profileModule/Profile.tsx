import React, { useEffect, useState } from 'react'

import s from './Profile.module.scss'

import user from 'assets/img/defaultUser.jpg'
import editName from 'assets/img/icons/edit.svg'
import { FileInput } from 'components/auth/FileInput'
import { ProfileEditName } from 'components/auth/ProfileEditName'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useLogoutMutation } from 'modules/auth/authApi'
import {
  avatarSelector,
  emailSelector,
  nameSelector,
} from 'modules/auth/authSelectors/authSelectors'
import { setIsLoggedIn } from 'pages/app/appSlice'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'
import { NavLink } from 'UI/nav-link/NavLink'

export const Profile = () => {
  const emailFromState = useTypedSelector(emailSelector)
  const nameFromState = useTypedSelector(nameSelector)
  const avatar = useTypedSelector(avatarSelector)
  const [logOut, { isLoading, isSuccess }] = useLogoutMutation()

  const dispatch = useTypedDispatch()

  const [name, setName] = useState(nameFromState)
  const [email, setEmail] = useState(emailFromState)
  const [editMode, setEditMode] = useState(false)

  const logout = () => {
    logOut().unwrap()
  }
  const editModeOpen = () => {
    setEditMode(true)
  }

  useEffect(() => {
    //need for render name/email from state in input when first render
    setName(name)
    setEmail(email)
  }, [nameFromState, emailFromState])

  useEffect(() => {
    isSuccess && dispatch(setIsLoggedIn(false))
  }, [isSuccess])

  return (
    <div>
      <section className={s.profilePage}>
        <NavLink url={PATH.PACKS} className={s.link}>
          <p>&lArr; Back to Packs List</p>
        </NavLink>

        <div className={s.profile_wrapper}>
          <h2 className={s.profile_title}>Personal Information</h2>

          <div className={s.profile_img}>
            <img src={!avatar ? user : avatar} alt={'photo profile'} />
            <FileInput />
          </div>

          {editMode ? (
            <ProfileEditName setEditMode={setEditMode} />
          ) : (
            <div className={s.profile_name}>
              {nameFromState}
              <div onClick={editModeOpen} className={s.profile_name_edit}>
                <img src={editName} alt={'edit name'} />
              </div>
            </div>
          )}

          <span className={s.profile_email}>{emailFromState}</span>

          <div>
            <Button styleType={'secondary'} className={s.profile_btn_logout} onClick={logout}>
              LogOut
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
