import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { MyPack } from 'components/packs/my-pack/MyPack'
import { OtherPack } from 'components/packs/other-pack/OtherPack'
import { PackType } from 'modules/packs/packsApi'

type PacksType = {
  responsePacks: any //todo должно быть PackType[]
}

export const Packs: FC<PacksType> = ({ responsePacks }) => {
  const [searchParams] = useSearchParams()
  const myId = useTypedSelector(state => state.auth.id)
  const myPacksPage = searchParams.has('user_id')
  const packs = myPacksPage
    ? responsePacks
    : responsePacks.filter((p: PackType) => p.user_id !== myId)

  return packs.map((p: any) => {
    const dateUpdate = formatDate(p.updated)

    return myPacksPage ? (
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
