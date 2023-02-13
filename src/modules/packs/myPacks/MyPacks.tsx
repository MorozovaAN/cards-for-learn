import React from 'react'

import { baseQueryParams } from 'common/constants/baseQueryParams'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useGetPacksQuery } from 'modules/packs/packsApi'

export const MyPacks = () => {
  const myId = useTypedSelector(state => state.auth.id)

  const { data: myPacks } = useGetPacksQuery({ ...baseQueryParams, user_id: myId as string })

  return (
    <div>
      {myPacks &&
        myPacks.cardPacks.map(i => {
          return (
            <div key={i._id}>
              {i.user_name}: <span>{i.name}</span>
            </div>
          )
        })}
    </div>
  )
}
