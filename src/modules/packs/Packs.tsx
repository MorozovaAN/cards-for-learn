import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { MyPack } from 'components/packs/my-pack/MyPack'
import { OtherPack } from 'components/packs/other-pack/OtherPack'
import { PackType } from 'modules/packs/packsApi'

type PacksType = {
  responsePacks: PackType[] | null
  isFetching: boolean
}

export const Packs: FC<PacksType> = ({ responsePacks, isFetching }) => {
  const [searchParams] = useSearchParams()
  const myId = useTypedSelector(state => state.auth.id)
  const myPacksPage = searchParams.has('user_id')
  const packs = myPacksPage
    ? responsePacks
    : responsePacks?.filter((p: PackType) => p.user_id !== myId)

  return (
    <div className={s.packsContainer}>
      {isFetching ? (
        <>
          <div className={s.skeletonPackContainer}>
            <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
          </div>
          <div className={s.skeletonPackContainer}>
            <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
          </div>
          <div className={s.skeletonPackContainer}>
            <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
          </div>
          <div className={s.skeletonPackContainer}>
            <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
          </div>
          <div className={s.skeletonPackContainer}>
            <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
          </div>
          <div className={s.skeletonPackContainer}>
            <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
          </div>
        </>
      ) : (
        packs?.map(p => {
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
      )}
    </div>
  )
}
