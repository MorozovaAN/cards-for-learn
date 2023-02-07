import React, { useState } from 'react'

import s from './Profile.module.scss'

import { isLoadingSelector } from 'app/appSelectors'
import editName from 'assets/img/icons/edit.svg'
import { ReactComponent as Logout } from 'assets/img/icons/logout.svg'
import defaultAva from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { UpdateProfileAvatar } from 'components/auth/UpdateProfileAvatar'
import { UpdateProfileName } from 'components/auth/UpdateProfileName'
import { UpdateProfile, useLogOutMutation, useUpdateProfileMutation } from 'modules/auth/authApi'
import { avatarSelector, emailSelector, nameSelector } from 'modules/auth/authSelectors'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'

export const Profile = () => {
  const emailFromState = useTypedSelector(emailSelector)
  const nameFromState = useTypedSelector(nameSelector)
  const avatarFromState = useTypedSelector(avatarSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const initialAva = avatarFromState ? avatarFromState : defaultAva
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

      <div className={s.imgContainer}>
        <img src={avatar ? avatar : initialAva} alt="user avatar" className={s.avatar} />
        <span className={s.photoUploader}>
          <UpdateProfileAvatar updateProfileCallback={updateProfileCallback} />
        </span>
      </div>

      {editMode ? (
        <UpdateProfileName
          setEditMode={setEditMode}
          updateProfileCallback={updateProfileCallback}
          editMode={editMode}
        />
      ) : (
        <div className={s.nameContainer}>
          <p className={s.name}>{name ? name : nameFromState}</p>
          <Button onClick={editModeOpen} styleType="icon" disabled={isLoading}>
            <img src={editName} alt="edit name icon" />
          </Button>
        </div>
      )}

      <p className={s.email}>{email ? email : emailFromState}</p>

      <Button styleType="primary" className={s.logout} onClick={logout} disabled={isLoading}>
        <div className={s.btnTextContainer}>
          <Logout fill="#fff" width="17" /> <span>LogOut</span>
        </div>
      </Button>
    </Box>
  )
}
