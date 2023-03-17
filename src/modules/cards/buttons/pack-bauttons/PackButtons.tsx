import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import s from 'modules/cards/buttons/pack-bauttons/PackButtons.module.scss'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type ButtonsType = {
  packId: string
  packName: string
  isFetching: boolean
  disabled: boolean
  privatePack: boolean
}
export const PackButtons: FC<ButtonsType> = ({ packId, privatePack, packName, disabled }) => {
  const [searchParams] = useSearchParams()
  const dispatch = useTypedDispatch()
  const myId = useTypedSelector(idSelector)
  const myCards = searchParams.get('user_id') === myId
  const skeletons = [1, 2, 3, 4]
  const openModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  const cardButtons = (
    <div className={s.buttonsContainer}>
      <Button
        styleType="secondary"
        className={disabled ? `${s.myPackBtn}` : `${s.editTooltip} ${s.myPackBtn} ${s.editBtn}`}
        disabled={disabled}
        onClick={() => openModalHandler('Edit pack name')}
        data-tooltip="Edit pack name"
      >
        <EditIcon width="18" height="26" fill="#017c6e" />
      </Button>
      <Button
        styleType="secondary"
        className={disabled ? `${s.myPackBtn}` : `${s.deleteTooltip} ${s.myPackBtn} ${s.deleteBtn}`}
        disabled={disabled}
        onClick={() => openModalHandler('Delete Pack')}
        data-tooltip="Delete pack"
      >
        <TrashIcon width="18" height="26" fill="#017c6e" />
      </Button>
    </div>
  )

  return <> {myCards ? cardButtons : null}</>
}
