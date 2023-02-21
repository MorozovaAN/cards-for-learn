import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { setModal } from 'app/appSlice'
import { ReactComponent as Plus } from 'assets/img/plus.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { NotFound } from 'components/notFound/NotFound'
import { idSelector } from 'modules/auth/authSelectors'
import { MyPack } from 'modules/packs/my-pack/MyPack'
import { OtherPack } from 'modules/packs/other-pack/OtherPack'
import { PackType } from 'modules/packs/packsApi'

type PacksType = {
  responsePacks: PackType[] | null
  isFetching: boolean
}

export const Packs: FC<PacksType> = ({ responsePacks, isFetching }) => {
  const [searchParams] = useSearchParams()
  const myId = useTypedSelector(idSelector)
  const myPacksPage = searchParams.has('user_id')
  const packs = myPacksPage
    ? responsePacks
    : responsePacks?.filter((p: PackType) => p.user_id !== myId)
  const skeletons = []
  const dispatch = useTypedDispatch()

  for (let i = 1; i <= 6; i++) {
    skeletons.push(
      <div className={s.skeletonPackContainer} key={i}>
        <Skeleton classes={{ root: s.skeletonPack }} animation="wave" variant="rectangular" />
      </div>
    )
  }

  const addPackHandler = () => {
    dispatch(setModal({ open: true, type: 'Add new pack' }))
  }

  return (
    <div className={s.packsContainer}>
      {isFetching ? (
        skeletons.map(s => {
          return s
        })
      ) : (
        <>
          {myPacksPage &&
            (!responsePacks?.length && searchParams.get('packName') !== null ? null : (
              <div className={s.addPack} onClick={addPackHandler}>
                <Plus />
              </div>
            ))}
          {!responsePacks?.length && searchParams.get('packName') !== null ? (
            <NotFound />
          ) : (
            packs?.map(p => {
              const dateUpdate = formatDate(p.updated)

              return myPacksPage ? (
                <MyPack
                  key={p._id}
                  packId={p._id}
                  packName={p.name}
                  cardsCount={p.cardsCount}
                  updated={dateUpdate}
                  privatePack={p.private}
                />
              ) : (
                <OtherPack
                  key={p._id}
                  packId={p._id}
                  packName={p.name}
                  cardsCount={p.cardsCount}
                  author={p.user_name}
                  updated={dateUpdate}
                />
              )
            })
          )}
        </>
      )}
    </div>
  )
}
