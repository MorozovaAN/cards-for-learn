import React, { FC } from 'react'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as CardsIcon } from 'assets/img/icons/cards.svg'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { ReactComponent as LockIcon } from 'assets/img/icons/lock.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import s from 'modules/packs/my-pack/MyPack.module.scss'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'
import { NavLink } from 'UI/nav-link/NavLink'

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

  const openPackModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  return (
    <div className={s.pack}>
      {packName.length > 22 ? (
        <div className={s.nameTooltip} data-tooltip={packName}>
          <p className={s.name}>{packName}</p>
        </div>
      ) : (
        <p className={s.name}>{packName}</p>
      )}

      {privatePack && (
        <div className={s.lockTooltip} data-tooltip="This pack is private">
          <LockIcon className={s.lock} />
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
        <div data-tooltip="View pack cards" className={s.cardsTooltip}>
          <NavLink url={`/cards?cardsPack_id=${packId}&user_id=${user_id}`} styleType="btnIcon">
            <CardsIcon className={s.icon} />
          </NavLink>
        </div>

        <div data-tooltip="Learn pack" className={s.learnTooltip}>
          <NavLink
            url={`/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`}
            styleType="btnIcon"
            disabled={cardsCount === 0}
          >
            <LearnIcon className={s.icon} />
          </NavLink>
        </div>

        <Button
          styleType="iconPrimary"
          onClick={() => openPackModalHandler('Edit pack name')}
          className={s.editTooltip}
          data-tooltip="Edit pack name"
        >
          <EditIcon className={s.icon} fill="#fff" />
        </Button>

        <Button
          styleType="iconPrimary"
          onClick={() => openPackModalHandler('Delete Pack')}
          className={s.deleteTooltip}
          data-tooltip="Delete pack"
        >
          <TrashIcon className={s.icon} />
        </Button>
      </div>
    </div>
  )
}
