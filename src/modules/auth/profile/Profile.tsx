import React, { useState } from 'react'

import s from './Profile.module.scss'

import editName from 'assets/img/icons/edit.svg'
import { UpdateProfileAvatar } from 'components/auth/UpdateProfileAvatar'
import { UpdateProfileName } from 'components/auth/UpdateProfileName'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { UpdateProfile, useLogOutMutation, useUpdateProfileMutation } from 'modules/auth/authApi'
import {
  avatarSelector,
  emailSelector,
  nameSelector,
} from 'modules/auth/authSelectors/authSelectors'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'

export const Profile = () => {
  const emailFromState = useTypedSelector(emailSelector)
  const nameFromState = useTypedSelector(nameSelector)
  const avatarFromState = useTypedSelector(avatarSelector)

  const [logOut] = useLogOutMutation()
  const [updateProfile, { name, avatar, email }] = useUpdateProfileMutation({
    selectFromResult: ({ data }) => ({
      name: data?.updatedUser?.name,
      avatar: data?.updatedUser?.avatar,
      email: data?.updatedUser?.email,
    }),
  })
  const [editMode, setEditMode] = useState(false)
  const updateProfileCallback = (value: UpdateProfile) => {
    updateProfile({ name: value.name, avatar: value.avatar })
  }
  const logout = () => {
    logOut().unwrap()
  }
  const editModeOpen = () => {
    setEditMode(true)
  }

  return (
    <Box>
      <h2 className={s.title}>Personal Information</h2>

      <div className={s.profile_img}>
        <img src={avatar ? avatar : avatarFromState} alt={'photo profile-page'} className={s.img} />
        <span className={s.photoUploader}>
          <UpdateProfileAvatar updateProfileCallback={updateProfileCallback} />
        </span>
      </div>

      {editMode ? (
        <UpdateProfileName
          setEditMode={setEditMode}
          updateProfileCallback={updateProfileCallback}
        />
      ) : (
        <div className={s.name}>
          {name ? name : nameFromState}
          <Button onClick={editModeOpen} styleType="icon">
            <img src={editName} alt={'edit name icon'} />
          </Button>
        </div>
      )}

      <p className={s.email}>{email ? email : emailFromState}</p>

      <Button styleType={'primary'} className={s.logout} onClick={logout}>
        LogOut
      </Button>
    </Box>
  )
}