import React, { FC, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { MyPack } from 'components/packs/my-pack/MyPack'
import { OtherPack } from 'components/packs/other-pack/OtherPack'
import { AddPackModal } from 'modules/packs/modals/AddPackModal'
import { PackType } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'

type PacksType = {
  responsePacks: PackType[]
}

export const Packs: FC<PacksType> = ({ responsePacks }) => {
  const [searchParams] = useSearchParams()
  const myId = useTypedSelector(state => state.auth.id)
  const myPacksPage = searchParams.has('user_id')
  const packs = myPacksPage
    ? responsePacks
    : responsePacks.filter((p: PackType) => p.user_id !== myId)
  const privateObjects = responsePacks.filter((p: PackType) => (p.private ? p : null)) //todo

  const [toggle, setToggle] = useState(false)

  return (
    <>
      {myPacksPage && (
        <Button styleType="primary" onClick={() => setToggle(!toggle)}>
          Add new Pack
        </Button>
      )}

      {toggle && <AddPackModal />}

      <div className={s.packContainer}>
        {packs.map(p => {
          const dateUpdate = formatDate(p.updated)

          return myPacksPage ? (
            <MyPack
              key={p._id}
              packId={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              updated={dateUpdate}
              privateObjects={privateObjects} //todo
            />
          ) : (
            <OtherPack
              key={p._id}
              packId={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              author={p.user_name}
              updated={dateUpdate}
            />
          )
        })}
      </div>
    </>
  )
}
