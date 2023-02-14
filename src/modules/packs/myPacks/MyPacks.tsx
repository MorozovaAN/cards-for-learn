import React, { useState } from 'react'

import s from './MyPacks.module.scss'

import { baseQueryParams } from 'common/constants/baseQueryParams'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Pack } from 'components/packs/pack/Pack'
import { AddPackModal } from 'modules/packs/modals/AddPackModal'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'

export const MyPacks = () => {
  const myId = useTypedSelector(state => state.auth.id)
  const [toggle, setToggle] = useState(false)

  const { myPacks } = useGetPacksQuery(
    { ...baseQueryParams, user_id: myId as string },
    { selectFromResult: ({ data }) => ({ myPacks: data?.cardPacks }) }
  )

  return (
    <div>
      <Button styleType="primary" onClick={() => setToggle(!toggle)}>
        Add new Pack
      </Button>
      {toggle && <AddPackModal />}

      <div className={s.myPackInner}>
        {myPacks?.map(pack => {
          return (
            <Pack
              key={pack._id}
              packId={pack._id}
              name={pack.name}
              cardsCount={pack.cardsCount}
              author={pack.user_name}
              updated={pack.updated}
            />
          )
        })}
      </div>
    </div>
  )
}
