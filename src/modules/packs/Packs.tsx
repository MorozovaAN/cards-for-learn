import React, { FC } from 'react'

import { formatDate } from 'common/utils/formatDate'
import { Pack } from 'components/packs/pack/Pack'
import { PackType } from 'modules/packs/packsApi'

type PacksType = {
  // packs: PackType[]
  packs: any
}

export const Packs: FC<PacksType> = ({ packs }) => {
  return packs.map((p: any) => {
    const dateUpdate = formatDate(p.updated)

    return (
      <Pack
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
