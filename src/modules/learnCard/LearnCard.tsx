import React, { useEffect, useState } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import { CardType, useGetCardsQuery } from '../cards/cardsApi'

import { Answer } from './answer/Answer'
import s from './LearnCard.module.scss'

import { paramsHelper } from 'common/utils/paramsHelper'
import { Button } from 'UI/button/Button'

export const LearnCard = () => {
  const [searchParams] = useSearchParams()
  const { data, isLoading } = useGetCardsQuery(paramsHelper(searchParams))
  const [showAnswer, setShowAnswer] = useState(false)
  const [card, setCard] = useState<CardType>({} as CardType)

  useEffect(() => {
    data && setCard(getCard(data?.cards))
  }, [data?.cards])

  const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum

    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

        return { sum: newSum, id: newSum < rand ? i : acc.id }
      },
      { sum: 0, id: -1 }
    )

    return cards[res.id + 1]
  }

  const nextCard = () => {
    setShowAnswer(false)
    data && setCard(getCard(data.cards))
  }

  return (
    <div className={s.learnCard}>
      {/*<NavLink*/}
      {/*  to={`/cards?cardsPack_id=${id}`}*/}
      {/*  className={`${s.link} ${isLoading ? s.linkDisabled : ''}`}*/}
      {/*>*/}
      {/*  <p>&lArr; Back to Pack List</p>*/}
      {/*</NavLink>*/}

      <h2 className={s.title}>
        {data?.packName ? (
          `Learn pack '${data?.packName}'`
        ) : (
          <div className={s.skeletonTitleContainer}>
            <Skeleton classes={{ root: s.skeletonLearn }} animation="wave" variant="rectangular" />
          </div>
        )}
      </h2>

      <div className={s.cardContainer}>
        <h3 className={s.subtitle}>
          {isLoading ? (
            <div className={s.skeletonSutTitleContainer}>
              <Skeleton
                classes={{ root: s.skeletonLearn }}
                animation="wave"
                variant="rectangular"
              />
            </div>
          ) : (
            <span className={s.text}>
              Question:
              {card.questionImg ? <img alt="questionImg" src={card.questionImg} /> : card.question}
            </span>
          )}
        </h3>

        {showAnswer ? (
          <Answer card_id={card._id} answer={card.answer} handelNextCard={nextCard} />
        ) : (
          <Button styleType="primary" onClick={() => setShowAnswer(true)}>
            Show answer
          </Button>
        )}
      </div>
    </div>
  )
}
