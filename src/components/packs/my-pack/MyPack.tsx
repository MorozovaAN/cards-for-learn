import React, { FC, useState } from 'react'

import classNames from 'classnames'

import s from './MyPack.module.scss'

import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/teach.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { DeletePackModal } from 'modules/packs/modals/DeletePackModal'
import { UpdatePackName } from 'modules/packs/modals/UpdatePackName'
import { PackType } from 'modules/packs/packsApi'
import { setPackId, setPackName } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type PackTypeProps = {
  packId: string
  name: string
  cardsCount: number
  updated: string
  privateObjects: PackType[] //todo
}

export const MyPack: FC<PackTypeProps> = ({
  packId,
  name,
  cardsCount,
  updated,
  privateObjects, //todo
}) => {
  const [toggle, setToggle] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(false)
  const dispatch = useTypedDispatch()

  console.log(privateObjects)

  const handleEditPack = () => {
    setToggle(!toggle)
    //я завела на имя и id стейт для дальнейшей передачи имени
    // dispatch(setPackId(packId))
    // dispatch(setPackName(name))
  }
  const handleDeletePack = () => {
    setToggleDelete(!toggleDelete)
    // dispatch(setPackId(packId))
    // dispatch(setPackName(name))
  }
  const btnClass = classNames('pack', {
    // private: privateObjects.filter(p => p.private),  //todo
    private: privateObjects,
  })

  return (
    <div className={btnClass}>
      {/*// <div className={s.pack}>*/}
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

        <Button styleType="iconPrimary" className={s.btnEdit} onClick={handleEditPack}>
          <EditIcon width="18" fill="#fff" />
        </Button>

        <Button styleType="iconPrimary" className={s.btnTrash} onClick={handleDeletePack}>
          <TrashIcon width="18" height="20" />
        </Button>
      </div>
      {toggle && <UpdatePackName packId={packId} name={name} />}
      {toggleDelete && <DeletePackModal packId={packId} name={name} />}
    </div>
  )
}
