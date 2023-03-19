import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import s from 'modules/cards/buttons/pack-bauttons/PackButtons.module.scss'
import { packNameSelector, privateCheckboxSelector } from 'modules/packs/packsSelectors'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type ButtonsType = {
  packId: string
  isFetching: boolean
  disabled: boolean
}
export const PackButtons: FC<ButtonsType> = ({ packId, disabled, isFetching }) => {
  const [searchParams] = useSearchParams()
  const dispatch = useTypedDispatch()
  const myId = useTypedSelector(idSelector)
  const packName = useTypedSelector(packNameSelector)
  const privatePack = useTypedSelector(privateCheckboxSelector)
  const myCards = searchParams.get('user_id') === myId
  const skeletons = [1, 2]

  const openModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  const cardButtons = isFetching ? (
    <div className={s.skeletonPackButtonsContainer}>
      {skeletons.map(el => (
        <Skeleton
          classes={{ root: s.skeletonPackButtons }}
          animation="wave"
          variant="rectangular"
          key={el}
        />
      ))}
    </div>
  ) : (
    <div className={s.buttonsContainer}>
      <Button
        styleType="secondary"
        className={s.editTooltip}
        disabled={disabled}
        onClick={() => openModalHandler('Edit pack name')}
        data-tooltip="Edit pack name"
      >
        <EditIcon fill="#017c6e" className={s.btnIcon} />
      </Button>

      <Button
        styleType="secondary"
        className={s.deleteTooltip}
        disabled={disabled}
        onClick={() => openModalHandler('Delete Pack')}
        data-tooltip="Delete pack"
      >
        <TrashIcon fill="#017c6e" className={s.btnIcon} />
      </Button>
    </div>
  )

  return myCards ? cardButtons : null
}
