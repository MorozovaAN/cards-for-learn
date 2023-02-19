import React, { FC } from 'react'

import Rating from '@mui/material/Rating'

import s from './Card.module.scss'

import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDeleteCardMutation } from 'modules/cards/cardsApi'

type CardType = {
  question: string
  answer: string
  updated: string
  grade: number
  id: string
  userId: string
}
export const Card: FC<CardType> = ({ question, answer, grade, updated, id, userId }) => {
  const myId = useTypedSelector(state => state.auth.id)
  const [deleteCard, {}] = useDeleteCardMutation()
  const deleteCardHandler = () => {
    deleteCard(id)
  }

  return (
    <div className={s.container}>
      <div>{question}</div>
      <div>{answer}</div>
      <div>{updated}</div>

      <Rating name="read-only" value={+grade.toFixed(2)} readOnly precision={0.2} />
      {myId === userId && (
        <div className={s.icons}>
          <EditIcon />
          <TrashIcon fill="black" onClick={deleteCardHandler} />
        </div>
      )}
    </div>
  )
}
