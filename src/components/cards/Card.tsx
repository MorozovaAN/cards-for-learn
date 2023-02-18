import React, { FC, useState } from 'react'

import s from './Card.module.scss'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { setCardId } from 'modules/cards/cardsSlise'
import { UpdateCardModal } from 'modules/cards/modals/UpdateCardModal'

type CardType = {
  question: string
  answer: string
  idCard: string
}
export const Card: FC<CardType> = ({ question, answer, idCard }) => {
  const dispatch = useTypedDispatch()
  const [toggle, setToggle] = useState(false)

  const handleEditPack = () => {
    setToggle(!toggle)
    dispatch(setCardId(idCard))
  }

  return (
    <div className={s.card}>
      question: {question} <span className={s.span}>answer: {answer}</span>
      <button onClick={handleEditPack}>Edit</button>
      {toggle && <UpdateCardModal question={question} answer={answer} />}
    </div>
  )
}
