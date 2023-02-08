import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useLogOutMutation } from 'modules'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'

export const HeaderMenu = () => {
  const [logOut] = useLogOutMutation()
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <MenuList open={openMenu}>
      <div
        onClick={() => {
          navigate(PATH.PROFILE)
          setOpenMenu(false)
        }}
      >
        Profile
      </div>
      <div
        onClick={() => {
          navigate(PATH.PACKS)
          setOpenMenu(false)
        }}
      >
        Packs
      </div>
      <div
        onClick={() => {
          logOut().unwrap()
          setOpenMenu(false)
        }}
      >
        Log out
      </div>
    </MenuList>
  )
}
