import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as CardsIcon } from 'assets/img/icons/cards.svg'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { ReactComponent as EditLock } from 'assets/img/icons/lock.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import s from 'modules/packs/my-pack/MyPack.module.scss'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  packName: string
  cardsCount: number
  updated: string
  privatePack: boolean
  user_id: string
}

export const MyPack: FC<PackType> = ({
  packId,
  packName,
  user_id,
  cardsCount,
  updated,
  privatePack,
}) => {
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const openPackModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  const learnPackHandler = () => {
    navigate(`/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`)
  }

  const viewCardsHandler = () => {
    navigate(`/cards?cardsPack_id=${packId}&user_id=${user_id}`)
  }

  return (
    <div className={s.pack}>
      {packName.length > 15 ? (
        <div className={s.nameTooltip} data-tooltip={packName}>
          <p className={s.name}>{packName}</p>
        </div>
      ) : (
        <p className={s.name}>{packName}</p>
      )}

      {privatePack && (
        <div className={s.lockTooltip} data-tooltip="This pack is private">
          <EditLock />
        </div>
      )}

      <p>
        <span className={s.subtitle}>Cards in pack: </span>
        {cardsCount}
      </p>

      <p>
        <span className={s.subtitle}>Last Updated: </span>
        {updated}
      </p>

      <div className={s.btnContainer}>
        <Button
          styleType="iconPrimary"
          onClick={viewCardsHandler}
          className={s.cardsTooltip}
          data-tooltip={'View pack cards'}
        >
          <CardsIcon />
        </Button>

        <Button
          styleType="iconPrimary"
          onClick={learnPackHandler}
          className={s.learnTooltip}
          data-tooltip={'Learn pack'}
        >
          <LearnIcon width="18" />
        </Button>

        <Button
          styleType="iconPrimary"
          onClick={() => openPackModalHandler('Edit pack name')}
          className={s.editTooltip}
          data-tooltip={'Edit pack name'}
        >
          <EditIcon width="18" fill="#fff" />
        </Button>

        <Button
          styleType="iconPrimary"
          onClick={() => openPackModalHandler('Delete Pack')}
          className={s.deleteTooltip}
          data-tooltip={'Delete pack'}
        >
          <TrashIcon width="18" height="20" />
        </Button>
      </div>
    </div>
  )
}
