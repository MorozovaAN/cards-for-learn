import Rating from '@mui/material/Rating'

import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDeleteCardMutation } from 'modules/cards/cardsApi'

import React, { FC, useState } from 'react'

import s from './Card.module.scss'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { setCardId } from 'modules/cards/cardsSlise'
import { UpdateCardModal } from 'modules/cards/modals/UpdateCardModal'

type CardType = {
  question: string
  answer: string
  updated: string
  grade: number
  idCard: string
  userId: string
}
export const Card: FC<CardType> = ({ question, answer, grade, updated, idCard, userId }) => {
  const myId = useTypedSelector(state => state.auth.id)
  const [deleteCard] = useDeleteCardMutation()
  const dispatch = useTypedDispatch()
  const [toggle, setToggle] = useState(false)

  const handleEditPack = () => {
    setToggle(!toggle)
    dispatch(setCardId(idCard))
  }

  const deleteCardHandler = () => {
    deleteCard(idCard)
  }

  return (
    <div className={s.container}>
      <div>{question}</div>
      <div>{answer}</div>
      <div>{updated}</div>

      <Rating name="read-only" value={+grade.toFixed(2)} readOnly precision={0.2} />
      {myId === userId && (
        <div className={s.icons}>
          <EditIcon onClick={handleEditPack} />
          <TrashIcon fill="black" onClick={deleteCardHandler} />
        </div>
      )}
      {toggle && <UpdateCardModal question={question} answer={answer} />}
    </div>
  )
}
