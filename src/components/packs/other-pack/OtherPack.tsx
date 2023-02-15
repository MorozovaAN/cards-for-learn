import React, { FC } from 'react'

import s from './OtherPack.module.scss'

import { ReactComponent as LearnIcon } from 'assets/img/icons/teach.svg'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  name: string
  cardsCount: number
  author: string
  updated: string
}

export const OtherPack: FC<PackType> = ({ packId, name, cardsCount, author, updated }) => {
  return (
    <div className={s.pack}>
      <p className={s.name}>{name}</p>

      <p>
        <span className={s.subtitle}>Cards in pack: </span>
        {cardsCount}
      </p>

      <p className={s.creator}>
        <span className={s.subtitle}>Create by: </span>
        {author}
      </p>

      <p>
        <span className={s.subtitle}>Last Updated: </span>
        {updated}
      </p>

      <Button styleType="primary" className={s.button}>
        <p>Learn this pack</p> <LearnIcon width="16" />
      </Button>
    </div>
  )
}