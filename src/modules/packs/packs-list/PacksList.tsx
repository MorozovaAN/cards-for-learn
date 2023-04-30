import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Skeletons } from '../../../components/skeletons/Skeletons'

import s from './PacksList.module.scss'

import { setModal } from 'app/appSlice'
import { ReactComponent as Plus } from 'assets/img/plus.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { NotFound } from 'components/not-found/NotFound'
import { idSelector } from 'modules/auth/authSelectors'
import { MyPack } from 'modules/packs/my-pack/MyPack'
import { OtherPack } from 'modules/packs/other-pack/OtherPack'
import { PackType } from 'modules/packs/packsApi'

type PacksType = {
  responsePacks: PackType[] | null
  isFetching: boolean
}

export const PacksList: FC<PacksType> = ({ responsePacks, isFetching }) => {
  const [searchParams] = useSearchParams()
  const dispatch = useTypedDispatch()
  const myId = useTypedSelector(idSelector)
  const myPacksPage = searchParams.has('user_id')
  const packs = myPacksPage
    ? responsePacks
    : responsePacks?.filter((p: PackType) => p.user_id !== myId)

  const addPackHandler = () => {
    dispatch(setModal({ open: true, type: 'Add new pack' }))
  }

  if (isFetching) return <Skeletons components="packs" />

  return (
    <>
      {myPacksPage &&
        (!packs?.length && searchParams.get('packName') !== null ? null : (
          <div className={s.addPack} onClick={addPackHandler}>
            <Plus />
          </div>
        ))}
      {!packs?.length && searchParams.get('packName') !== null ? (
        <NotFound notFound="notFound" />
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
              user_id={p.user_id}
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
  )
}
