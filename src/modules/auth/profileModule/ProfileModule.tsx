import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import s from './Profile.module.scss'
/*import { ProfileEditName } from './ProfileEditName'*/

import editName from 'assets/img/icons/edit.svg'
// @ts-ignore
import ava from 'assets/img/profile_photo.jpg'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { emailSelector, nameSelector } from 'modules/auth/authSelectors/authSelectors'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const Profile = () => {
  const emailFromState = useTypedSelector(emailSelector)
  const nameFromState = useTypedSelector(nameSelector)

  const [name, setName] = useState(nameFromState)
  const [email, setEmail] = useState(emailFromState)
  const [editMode, setEditMode] = useState(false)

  const dispatch = useTypedDispatch()

  const logout = () => {}
  const editModeOpen = () => {
    setEditMode(true)
  }

  useEffect(() => {
    //need for render name/email from state in input when first render
    setName(name)
    setEmail(email)
  }, [nameFromState, emailFromState])

  return (
    <section className={s.profilePage}>
      <NavLink to={PATH.PACKS} className={s.link}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>

      <div className={s.profile_wrapper}>
        <h2 className={s.profile_title}>Personal Information</h2>

        <div className={s.profile_img}>
          <img src={ava} alt={'photo profile'} />
          <label className={s.profile_file}>
            <input type={'file'} />
          </label>
        </div>

        {/*{editMode ? (
          <ProfileEditName setEditMode={setEditMode} />
        ) : (
          <div className={s.profile_name}>
            {nameFromState}
            <div onClick={editModeOpen} className={s.profile_name_edit}>
              <img src={editName} alt={'edit name'} />
            </div>
          </div>
        )}*/}

        <span className={s.profile_email}>{emailFromState}</span>

        <div>
          <Button styleType={'secondary'} className={s.profile_btn_logout} onClick={logout}>
            LogOut
          </Button>
        </div>
      </div>
    </section>
  )
}
