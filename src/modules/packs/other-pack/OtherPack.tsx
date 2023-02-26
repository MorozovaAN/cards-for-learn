import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as CardsIcon } from 'assets/img/icons/cards.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import s from 'modules/packs/other-pack/OtherPack.module.scss'
import { setPackId } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  packName: string
  cardsCount: number
  author: string
  updated: string
}

export const OtherPack: FC<PackType> = ({ packId, packName, cardsCount, author, updated }) => {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  const learnPackHandler = () => {
    navigate(`/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`)
  }

  const viewCardsHandler = () => {
    dispatch(setPackId(packId))
    navigate('/cards')
  }

  return (
    <div className={s.pack}>
      <p className={s.name}>{packName}</p>

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

      <div className={s.buttonsContainer}>
        <Button styleType="primary" className={s.button} onClick={learnPackHandler}>
          <p>Learn pack</p>
          <LearnIcon className={s.learnIcon} />
        </Button>

        <Button styleType="primary" className={s.button} onClick={viewCardsHandler}>
          <p>View cards</p>
          <CardsIcon className={s.cardsIcon} />
        </Button>
      </div>
    </div>
  )
}
