import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import s from 'modules/packs/my-pack/MyPack.module.scss'
import { setPackId, setPackName } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  name: string
  cardsCount: number
  updated: string
  privatePack: boolean
}

export const MyPack: FC<PackType> = ({ packId, name, cardsCount, updated, privatePack }) => {
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const openPackModalHandler = (type: ModalType) => {
    dispatch(setPackName(name))
    dispatch(setPackId(packId))
    dispatch(setModal({ open: true, type }))
  }

  const learnPackHandler = () => {
    dispatch(setPackId(packId))
    navigate('/cards')
  }

  return (
    <div className={`${s.pack} ${privatePack ? s.privateValue : ''}`}>
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
        <Button styleType="iconPrimary" className={s.btnLearn} onClick={learnPackHandler}>
          <LearnIcon width="18" />
        </Button>

        <Button
          styleType="iconPrimary"
          className={s.btnEdit}
          onClick={() => openPackModalHandler('Edit pack name')}
        >
          <EditIcon width="18" fill="#fff" />
        </Button>

        <Button
          styleType="iconPrimary"
          className={s.btnTrash}
          onClick={() => openPackModalHandler('Delete Pack')}
        >
          <TrashIcon width="18" height="20" />
        </Button>
      </div>
    </div>
  )
}
