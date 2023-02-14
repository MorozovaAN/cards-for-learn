import React from 'react'

import { baseQueryParams } from 'common/constants/baseQueryParams'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { OtherPack } from 'components/packs/other-pack/OtherPack'
import { useGetPacksQuery } from 'modules/packs/packsApi'

export const MyPacks = () => {
  const myId = useTypedSelector(state => state.auth.id)

  const { myPacks } = useGetPacksQuery(
    { ...baseQueryParams, user_id: myId as string },
    {
      selectFromResult: ({ data }) => ({
        myPacks: data?.cardPacks,
      }),
    }
  )

  return (
    <div>
      {myPacks?.map(pack => {
        return (
          <OtherPack
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
  )
}
