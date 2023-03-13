import React, { useEffect, useState } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import { paramsHelper } from 'common/utils/paramsHelper'
import { CardType, useGetCardsQuery } from 'modules/cards/cardsApi'
import { Answer } from 'modules/cards/learn-cards/answer/Answer'
import s from 'modules/cards/learn-cards/LearnCards.module.scss'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'

export const LearnCards = () => {
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

  const question = card.questionImg ? (
    <div className={s.questionContainer}>
      <h3 className={s.subtitleImg}>Question: </h3>
      <img className={s.img} alt="question image" src={card.questionImg} />
    </div>
  ) : (
    <h3 className={s.subtitle}>
      <span>Question: </span>
      <span className={s.subtitleQuestion}>{card.question}</span>
    </h3>
  )

  return (
    <div className={s.learnCards}>
      <h2 className={s.title}>
        {data?.packName ? (
          `Learning pack '${data?.packName}'`
        ) : (
          <div className={s.skeletonTitleContainer}>
            <Skeleton classes={{ root: s.skeletonTitle }} animation="wave" variant="rectangular" />
          </div>
        )}
      </h2>

      <Box size="L" className={s.box}>
        {isLoading ? (
          <div className={s.skeletonSubtitleContainer}>
            <Skeleton
              classes={{ root: s.skeletonSubtitle }}
              animation="wave"
              variant="rectangular"
            />
          </div>
        ) : (
          question
        )}

        {showAnswer ? (
          <Answer card_id={card._id} answer={card.answer} handelNextCard={nextCard} />
        ) : (
          <Button
            styleType="primary"
            className={s.button}
            onClick={() => setShowAnswer(true)}
            disabled={isLoading}
          >
            Show answer
          </Button>
        )}
      </Box>
    </div>
  )
}
