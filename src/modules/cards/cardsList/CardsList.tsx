import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'

import { CardType } from '../cardsApi'

import s from './CardsList.module.scss'

import { formatDate } from 'common/utils/formatDate'
import { Card } from 'components/cards/Card'
import { NotFound } from 'components/notFound/NotFound'

type CardsListType = {
  cards: CardType[] | null
  isFetching: boolean
}

export const CardsList: FC<CardsListType> = ({ cards, isFetching }) => {
  const skeletons = []

  for (let i = 1; i <= 6; i++) {
    skeletons.push(
      <div className={s.skeletonCardsContainer} key={i}>
        <Skeleton classes={{ root: s.skeletonCard }} animation="wave" variant="rectangular" />
      </div>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.cardsListHeader}>
        <p className={s.question}>Question</p>
        <p className={s.answer}>Answer</p>
        <p className={s.updated}>Last updated</p>
        <p className={s.grade}>Grade</p>
      </div>

      {/* eslint-disable-next-line no-nested-ternary */}
      {isFetching ? (
        skeletons.map(s => {
          return s
        })
      ) : cards ? (
        cards.map(card => (
          <Card
            key={card._id}
            idCard={card._id}
            question={card.question}
            grade={card.grade}
            answer={card.answer}
            updated={formatDate(card.updated)}
            userId={card.user_id}
          />
        ))
      ) : (
        <NotFound />
      )}
    </div>
  )
}
