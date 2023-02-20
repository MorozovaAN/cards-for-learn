import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import s from 'modules/packs/other-pack/OtherPack.module.scss'
import { setPackId } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  name: string
  cardsCount: number
  author: string
  updated: string
}

export const OtherPack: FC<PackType> = ({ packId, name, cardsCount, author, updated }) => {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  const learnPackHandler = () => {
    dispatch(setPackId(packId))
    navigate('/cards')
  }

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

      <Button styleType="primary" className={s.button} onClick={learnPackHandler}>
        <p>Learn this pack</p> <LearnIcon width="16" className={s.learnIcon} />
      </Button>
    </div>
  )
}
