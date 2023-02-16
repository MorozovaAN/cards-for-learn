import React, { FC, useState } from 'react'

import s from './Packs.module.scss'

import { formatDate } from 'common/utils/formatDate'
import { MyPack } from 'components/packs/my-pack/MyPack'
import { OtherPack } from 'components/packs/other-pack/OtherPack'
import { AddPackModal } from 'modules/packs/modals/AddPackModal'
import { Button } from 'UI/button/Button'

type PacksType = {
  packs: any //todo должно быть PackType[]
  myPacks: boolean
}

export const Packs: FC<PacksType> = ({ packs, myPacks }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      {myPacks && (
        <Button styleType="primary" onClick={() => setToggle(!toggle)}>
          Add new Pack
        </Button>
      )}

      {toggle && <AddPackModal />}
      <div className={s.packContainer}>
        {packs.map((p: any) => {
          const dateUpdate = formatDate(p.updated)

          return myPacks ? (
            <MyPack
              key={p._id}
              packId={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              updated={dateUpdate}
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
