import React, { FC } from 'react'

import { ReactComponent as CardsIcon } from 'assets/img/icons/cards.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import s from 'modules/packs/other-pack/OtherPack.module.scss'
import { NavLink } from 'UI/nav-link/NavLink'

type PackType = {
  packId: string
  packName: string
  cardsCount: number
  author: string
  updated: string
}

export const OtherPack: FC<PackType> = ({ packId, packName, cardsCount, author, updated }) => {
  return (
    <div className={s.pack}>
      {packName.length > 28 ? (
        <div className={s.tooltip} data-tooltip={packName}>
          <p className={s.name}>{packName}</p>
        </div>
      ) : (
        <p className={s.name}>{packName}</p>
      )}

      <p className={s.subtitleContainer}>
        <span className={s.subtitle}>Cards in pack: </span>
        {cardsCount}
      </p>

      <p className={`${s.creator} ${s.subtitleContainer}`}>
        <span className={`${s.subtitle} ${s.creatorSubtitle}`}>Create by: </span>
        {author}
      </p>

      <p className={s.subtitleContainer}>
        <span className={s.subtitle}>Last Updated: </span>
        {updated}
      </p>

      <div className={s.buttonsContainer}>
        <NavLink
          url={`/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`}
          styleType="button"
          className={s.linkBtn}
        >
          <div className={s.btnContainer}>
            <p className={s.btnTitle}>Learn pack</p>
            <LearnIcon className={s.learnIcon} />
          </div>
        </NavLink>

        <NavLink url={`/cards?cardsPack_id=${packId}`} styleType="button" className={s.linkBtn}>
          <div className={s.btnContainer}>
            <p className={s.btnTitle}>View cards</p>
            <CardsIcon className={s.cardsIcon} />
          </div>
        </NavLink>
      </div>
    </div>
  )
}
