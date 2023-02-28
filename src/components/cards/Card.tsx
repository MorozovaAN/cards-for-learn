import React, { FC, useState } from 'react'

import Rating from '@mui/material/Rating'
import { AnimatePresence, motion } from 'framer-motion'

import s from './Card.module.scss'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import image from 'assets/img/question.png'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import { setCardInfo } from 'modules/cards/cardsSlise'
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
  const [showAnswer, setShowAnswer] = useState(false)
  const dispatch = useTypedDispatch()
  const myCards = userId === myId

  const openCardModalHandler = (type: ModalType) => {
    dispatch(setCardInfo({ idCard, answer, question }))
    dispatch(setModal({ open: true, type }))
  }

  const btnAnswerClickHandler = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.question}>
          {questionImg ? (
            <img
              src={questionImg ? questionImg : image}
              className={s.questionImg}
              alt="question img"
            />
          ) : (
            question
          )}
        </div>

        <div className={myCards ? s.answerContainerMyCards : s.answerContainer}>
          <button className={s.answerButton} onClick={btnAnswerClickHandler}>
            <p className={s.answerButtonText}>{showAnswer ? 'Hide answer ▴' : 'Show answer ▾'}</p>
          </button>

          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className={s.answer}
              >
                {answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>{updated}</div>

        <div>
          <Rating name="read-only" value={+grade.toFixed(2)} readOnly precision={0.2} />
        </div>

        {myCards && (
          <div className={s.actions}>
            <Button
              styleType="iconPrimary"
              className={s.btnEdit}
              onClick={() => openCardModalHandler('Edit card name')}
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
