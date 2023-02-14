import React, { FC } from 'react'

import { formatDate } from 'common/utils/formatDate'
import { MyPack } from 'components/packs/my-pack/MyPack'
import { OtherPack } from 'components/packs/other-pack/OtherPack'

type PacksType = {
  // packs: PackType[]
  packs: any
  myPacks: string | null
}

export const Packs: FC<PacksType> = ({ packs, myPacks }) => {
  return packs.map((p: any) => {
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
  })
}
