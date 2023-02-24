import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'

import s from './Buttons.module.scss'

import { ModalType } from 'app/appSlice'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { Button } from 'UI/button/Button'

type ButtonsType = {
  myCards: boolean
  isFetching: boolean
  lernCallBack: () => void
  addCardCallBack: (type: ModalType) => void
}

export const Buttons: FC<ButtonsType> = ({
  lernCallBack,
  addCardCallBack,
  myCards,
  isFetching,
}) => {
  const myCardsList = isFetching ? (
    <div className={s.skeletonMyCardsContainer}>
      <Skeleton classes={{ root: s.skeletonMyCards }} animation="wave" variant="rectangular" />
      <Skeleton classes={{ root: s.skeletonMyCards2 }} animation="wave" variant="rectangular" />
    </div>
  ) : (
    <>
      <Button
        styleType="secondary"
        className={s.button}
        onClick={() => addCardCallBack('Add new card')}
      >
        Add new card
      </Button>

      <Button styleType="secondary" className={s.button} onClick={lernCallBack}>
        <p>Learn pack</p>
        <LearnIcon className={s.learnIcon} stroke="#000" />
      </Button>
    </>
  )

  const otherCardsList = isFetching ? (
    <div className={s.skeletonOtherCardsContainer}>
      <Skeleton classes={{ root: s.skeletonOtherCards }} animation="wave" variant="rectangular" />
    </div>
  ) : (
    <Button styleType="secondary" className={s.button} onClick={lernCallBack}>
      <p>Learn pack</p>
      <LearnIcon className={s.learnIcon} stroke="#000" />
    </Button>
  )

  return <> {myCards ? myCardsList : otherCardsList}</>
}
