import React, { FC } from 'react'

import { CardType } from '../cardsApi'

import s from './CardsList.module.scss'

import { formatDate } from 'common/utils/formatDate'
import { NotFound } from 'components/not-found/NotFound'
import { Skeletons } from 'components/skeletons/Skeletons'
import { Card } from 'modules/cards/cards-list/card/Card'

type CardsListType = {
  cards: CardType[] | null
  myCards: boolean
  isFetching: boolean
}

export const CardsList: FC<CardsListType> = ({ cards, myCards, isFetching }) => {
  if (!isFetching && !cards?.length) return <NotFound />

  return (
    <>
      <div className={s.cardsList}>
        <div className={s.cardsListHeader}>
          <p className={s.question}>Question</p>
          <p className={myCards ? s.answerMyCards : s.answer}>Answer</p>
          <p className={s.updated}>Last updated</p>
          <p className={myCards ? s.gradeMyCards : s.grade}>Grade</p>
          {myCards && <p className={s.actions}>Actions</p>}
        </div>

        {isFetching ? (
          <Skeletons components="cards" />
        ) : (
          cards?.map(card => (
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
          ))
        )}
      </div>
    </>
  )
}
