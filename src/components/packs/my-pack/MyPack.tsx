import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './MyPack.module.scss'

import { setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/teach.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { setPackId } from 'modules/packs/packsSlise'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
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

  const openEditPackNameModalHandler = () => {
    dispatch(setModal({ open: true, type: 'Edit pack name' }))
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
          onClick={openEditPackNameModalHandler}
        >
          <EditIcon width="18" fill="#fff" />
        </Button>

        <Button styleType="iconPrimary" className={s.btnTrash} onClick={deletePackHandler}>
          <TrashIcon width="18" height="20" />
        </Button>
      </div>
    </div>
  )
}
