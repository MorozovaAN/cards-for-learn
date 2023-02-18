import React, { FC, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { NotFound } from 'components/notFound/NotFound'
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
        {packs.length ? (
          packs.map(p => {
            const dateUpdate = formatDate(p.updated)

            return myPacksPage ? (
              <MyPack
                key={p._id}
                packId={p._id}
                name={p.name}
                cardsCount={p.cardsCount}
                updated={dateUpdate}
                privatePack={p.private}
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
        ) : (
          <NotFound />
        )}
      </div>
    </>
  )
}
