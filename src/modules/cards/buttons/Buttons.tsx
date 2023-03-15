import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './Buttons.module.scss'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { ReactComponent as PlusIcon } from 'assets/img/icons/plus.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'
import { NavLink } from 'UI/nav-link/NavLink'

type ButtonsType = {
  packId: string
  packName: string
  isFetching: boolean
  disabled: boolean
  privatePack: boolean
  cardsCount: number
}

export const Buttons: FC<ButtonsType> = ({
  packId,
  packName,
  privatePack,
  isFetching,
  disabled,
  cardsCount,
}) => {
  const [searchParams] = useSearchParams()

  const dispatch = useTypedDispatch()
  const myId = useTypedSelector(idSelector)
  const myCards = searchParams.get('user_id') === myId
  const skeletons = [1, 2, 3, 4]
  const learnUrl = `/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`

  const openModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  const myCardsList = isFetching ? (
    skeletons.map(el => (
      <div className={s.skeletonMyCardsContainer} key={el}>
        <Skeleton classes={{ root: s.skeletonMyCards }} animation="wave" variant="rectangular" />
      </div>
    ))
  ) : (
    <>
      <Button
        styleType="secondary"
        className={disabled ? `${s.myPackBtn}` : `${s.addTooltip} ${s.myPackBtn}`}
        disabled={disabled}
        onClick={() => openModalHandler('Add new card')}
        data-tooltip="Add new card"
      >
        <PlusIcon width="20" height="26" />
      </Button>

      <div data-tooltip={'Learn pack'} className={s.learnTooltip}>
        <NavLink
          url={learnUrl}
          styleType="btnIcon"
          className={s.myPackLearnBtn}
          disabled={disabled || cardsCount === 0}
        >
          <LearnIcon className={s.learnIcon} stroke="#017c6e" />
        </NavLink>
      </div>

      <Button
        styleType="secondary"
        className={disabled ? `${s.myPackBtn}` : `${s.editTooltip} ${s.myPackBtn}`}
        disabled={disabled}
        onClick={() => openModalHandler('Edit pack name')}
        data-tooltip="Edit pack name"
      >
        <EditIcon width="18" height="26" fill="#017c6e" />
      </Button>

      <Button
        styleType="secondary"
        className={disabled ? `${s.myPackBtn}` : `${s.deleteTooltip} ${s.myPackBtn}`}
        disabled={disabled}
        onClick={() => openModalHandler('Delete Pack')}
        data-tooltip="Delete pack"
      >
        <TrashIcon width="18" height="26" fill="#017c6e" />
      </Button>
    </>
  )

  const otherCardsList = isFetching ? (
    <div className={s.skeletonOtherCardsContainer}>
      <Skeleton classes={{ root: s.skeletonOtherCards }} animation="wave" variant="rectangular" />
    </div>
  ) : (
    <NavLink
      url={learnUrl}
      className={s.otherPackLearnBtn}
      styleType="buttonSecondary"
      disabled={disabled}
    >
      <p>Learn pack</p>
      <LearnIcon className={s.learnIcon} stroke="#017c6e" />
    </NavLink>
  )

  return (
    <> {myCards ? <div className={s.buttonsContainer}> {myCardsList} </div> : otherCardsList}</>
  )
}
