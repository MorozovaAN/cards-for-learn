import React, { FC } from 'react'

import Rating from '@mui/material/Rating'

import s from './Card.module.scss'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import { setCardAnswer, setCardId, setCardQuestion } from 'modules/cards/cardsSlise'
import { Button } from 'UI/button/Button'

type CardType = {
  question: string
  answer: string
  updated: string
  grade: number
  idCard: string
  userId: string
  questionImg: string
}
export const Card: FC<CardType> = ({
  question,
  questionImg,
  answer,
  grade,
  updated,
  idCard,
  userId,
}) => {
  const myId = useTypedSelector(idSelector)
  const dispatch = useTypedDispatch()

  const editCardHandler = (type: ModalType) => {
    dispatch(setCardId(idCard))
    dispatch(setCardQuestion(question))
    dispatch(setCardAnswer(answer))
    dispatch(setModal({ open: true, type }))
  }

  const openCardModalHandler = (type: ModalType) => {
    dispatch(setCardQuestion(question))
    dispatch(setCardId(idCard))
    dispatch(setModal({ open: true, type }))
  }

  return (
    <>
      <div className={s.container}>
        <div>
          {questionImg ? (
            <img src={questionImg} style={{ width: '70px', height: '50px' }} alt="" />
          ) : (
            question
          )}
        </div>
        <div>{answer}</div>
        <div>{updated}</div>

        <Rating name="read-only" value={+grade.toFixed(2)} readOnly precision={0.2} />

        {myId === userId && (
          <div className={s.icons}>
            <Button
              styleType="iconPrimary"
              className={s.btnEdit}
              onClick={() => editCardHandler('Edit card name')}
            >
              <EditIcon width="18" fill="#fff" />
            </Button>

            <Button
              styleType="iconPrimary"
              className={s.btnTrash}
              onClick={() => openCardModalHandler('Delete Card')}
            >
              <TrashIcon width="18" height="20" />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
