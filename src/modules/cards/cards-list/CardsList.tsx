import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'

import { CardType } from '../cardsApi'

import s from './CardsList.module.scss'

import { skeletonsSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { Card } from 'modules/cards/card/Card'

type CardsListType = {
  cards: CardType[] | null
  myCards: boolean
  isFetching: boolean
}

export const CardsList: FC<CardsListType> = ({ cards, myCards, isFetching }) => {
  const skeletons = useTypedSelector(skeletonsSelector)

  return (
    <div className={s.cardsList}>
      <div className={s.cardsListHeader}>
        <p className={s.question}>Question</p>
        <p className={myCards ? s.answerMyCards : s.answer}>Answer</p>
        <p className={s.updated}>Last updated</p>
        <p className={myCards ? s.gradeMyCards : s.grade}>Grade</p>
        {myCards && <p className={s.actions}>Actions</p>}
      </div>

      {isFetching
        ? skeletons.map(el => (
            <div className={s.skeletonCardsContainer} key={el}>
              <Skeleton classes={{ root: s.skeletonCard }} animation="wave" variant="rectangular" />
            </div>
          ))
        : cards?.map(card => (
            <Card
              key={card._id}
              idCard={card._id}
              question={card.question}
              grade={card.grade}
              answer={card.answer}
              updated={formatDate(card.updated)}
              userId={card.user_id}
              questionImg={card.questionImg}
            />
          ))}
    </div>
  )
}
