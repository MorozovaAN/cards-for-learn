import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from 'modules/packs/Packs.module.scss'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const MyOtherButtons = () => {
  const navigate = useNavigate()
  const handleMyPacks = () => {
    navigate(PATH.MY_PACKS)
  }

  return (
    <div className={s.buttonsContainer}>
      <Button styleType="primary" className={s.btnMy} onClick={handleMyPacks}>
        My
      </Button>
      <Button styleType="secondary" className={s.btnOther}>
        Other
      </Button>
    </div>
  )
}
