import React, { FC, useState } from 'react'

import s from './MyPack.module.scss'

import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/teach.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { UpdatePackName } from 'modules/packs/modals/UpdatePackName'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  name: string
  cardsCount: number
  updated: string
}

export const MyPack: FC<PackType> = ({ packId, name, cardsCount, updated }) => {
  const [toggle, setToggle] = useState(false)

  const handleTogglePack = () => {
    setToggle(!toggle)
  }

  return (
    <div className={s.pack}>
      <p className={s.name}>{name}</p>

      <p>
        <span className={s.subtitle}>Cards in pack: </span>
        {cardsCount}
      </p>

      <p>
        <span className={s.subtitle}>Last Updated: </span>
        {updated}
      </p>

      <div className={s.btnContainer}>
        <Button styleType="iconPrimary" className={s.btnLearn}>
          <LearnIcon width="18" />
        </Button>

        <Button styleType="iconPrimary" className={s.btnEdit} onClick={handleTogglePack}>
          <EditIcon width="18" fill="#fff" />
        </Button>

        <Button styleType="iconPrimary" className={s.btnTrash}>
          <TrashIcon width="18" height="20" />
        </Button>
      </div>
      {toggle && <UpdatePackName packId={packId} name={name} />}
    </div>
  )
}
