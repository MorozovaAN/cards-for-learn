import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import { Skeletons } from '../../../../components/skeletons/Skeletons'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { ReactComponent as PlusIcon } from 'assets/img/icons/plus.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import s from 'modules/cards/buttons/card-buttons/CardButtons.module.scss'
import { packNameSelector, privateCheckboxSelector } from 'modules/packs/packsSelectors'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'
import { NavLink } from 'UI/nav-link/NavLink'

type ButtonsType = {
  packId: string
  isFetching: boolean
  disabled: boolean
  cardsCount: number
}

export const CardButtons: FC<ButtonsType> = ({ packId, isFetching, disabled, cardsCount }) => {
  const [searchParams] = useSearchParams()
  const dispatch = useTypedDispatch()

  const myId = useTypedSelector(idSelector)
  const packName = useTypedSelector(packNameSelector)
  const privatePack = useTypedSelector(privateCheckboxSelector)
  const myCards = searchParams.get('user_id') === myId
  const learnUrl = `/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`

  const openModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  const myCardsList = isFetching ? (
    <div className={s.skeletonCardButtonsContainer}>
      <Skeletons components="cardButtons" count={[1, 2]} />
    </div>
  ) : (
    <div className={s.buttonsContainer}>
      <Button
        styleType="secondary"
        className={s.addTooltip}
        disabled={disabled}
        onClick={() => openModalHandler('Add new card')}
        data-tooltip="Add new card"
      >
        <PlusIcon className={s.plusIcon} />
      </Button>

      <div data-tooltip="Learn pack" className={s.learnTooltip}>
        <NavLink
          url={learnUrl}
          styleType="btnIcon"
          className={s.learnBtn}
          disabled={disabled || cardsCount === 0}
        >
          <LearnIcon className={s.learnIcon} stroke="#017c6e" />
        </NavLink>
      </div>
    </div>
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
      <span className={s.learnBtnText}>Learn pack</span>
      <LearnIcon className={s.learnIcon} stroke="#017c6e" />
    </NavLink>
  )

  return myCards ? myCardsList : otherCardsList
}
