import React, { useState } from 'react'

import Skeleton from '@mui/material/Skeleton'

import s from './Profile.module.scss'

import editName from 'assets/img/icons/edit.svg'
import { ReactComponent as Logout } from 'assets/img/icons/exit.svg'
import defaultAvatar from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { UpdateUserAvatar } from 'components/auth/update-user-avatar/UpdateUserAvatar'
import { UpdateUserName } from 'components/auth/update-user-name/UpdateUserName'
import {
  useLogOutMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserNameMutation,
} from 'modules/auth/authApi'
import { avatarSelector, emailSelector, nameSelector } from 'modules/auth/authSelectors'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'

export const Profile = () => {
  const email = useTypedSelector(emailSelector)
  const name = useTypedSelector(nameSelector)
  const avatar = useTypedSelector(avatarSelector)
  const [logOut] = useLogOutMutation()
  const [updateUserName, { isLoading: isLoadingName }] = useUpdateUserNameMutation()
  const [updateUserAvatar, { isLoading: isLoadingAvatar }] = useUpdateUserAvatarMutation()
  const [editMode, setEditMode] = useState(false)

  const updateNameCallback = (name: string) => {
    updateUserName(name)
  }
  const updateAvatarCallback = (avatar: string) => {
    updateUserAvatar(avatar)
  }

  const logout = () => {
    logOut().unwrap()
  }

  const editModeOpen = () => {
    setEditMode(true)
  }

  const showUserName = isLoadingName ? (
    <div className={s.skeletonNameContainer}>
      <Skeleton classes={{ root: s.skeletonName }} animation="wave" variant="rectangular" />
    </div>
  ) : (
    <div className={s.nameContainer}>
      <p className={s.name}>{name}</p>
      <Button styleType="icon" onClick={editModeOpen} disabled={isLoadingName || isLoadingAvatar}>
        <img src={editName} alt="edit name icon" width="15" />
      </Button>
    </div>
  )

  return (
    <Box size="L" className={s.profileBox}>
      <h2 className={s.title}>Personal Information</h2>

      {isLoadingAvatar ? (
        <div className={s.skeletonAvatarContainer}>
          <Skeleton classes={{ root: s.skeletonAvatar }} animation="wave" variant="circular" />
        </div>
      ) : (
        <div className={s.imgContainer}>
          <img src={avatar ? avatar : defaultAvatar} alt="user avatar" className={s.avatar} />

          <span className={s.photoUploader}>
            <UpdateUserAvatar updateAvatarCallback={updateAvatarCallback} />
          </span>
        </div>
      )}

      {editMode ? (
        <UpdateUserName
          setEditMode={setEditMode}
          updateNameCallback={updateNameCallback}
          editMode={editMode}
        />
      ) : (
        <>{showUserName}</>
      )}

      <p className={s.email}>{email}</p>

      <Button
        styleType="primary"
        className={s.logout}
        onClick={logout}
        disabled={isLoadingName || isLoadingAvatar}
      >
        <div className={s.btnTextContainer}>
          <Logout fill="#fff" width="17" /> <span>LogOut</span>
        </div>
      </Button>
    </Box>
  )
}
