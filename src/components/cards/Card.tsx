import React, { FC } from 'react'
type CardType = {
  question: string
}
export const Card: FC<CardType> = ({ question }) => {
  return <div>{question}</div>
}
