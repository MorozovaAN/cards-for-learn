import React, { ChangeEvent, useState } from 'react'

import edit from 'assets/img/icons/edit.svg'
import teach from 'assets/img/icons/teach.svg'
import trash from 'assets/img/icons/trash.svg'
import { baseQueryParams, BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { Search } from 'components/search/Search'
import { useLogOutMutation } from 'modules'
import { Pack } from 'modules/packs/pack/Pack'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'


export const Packs = () => {
  const [baseParams, setBaseParams] = useState<BaseQueryParamsType>(baseQueryParams)
  const { data: packs } = useGetPacksQuery(baseParams)
  
  const [logout] = useLogOutMutation()
  const handlerLogout = async () => {
    await logout()
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseParams({ ...baseParams, packName: e.currentTarget.value })
  }

  return (
    <div>
      <Search class={'need write here class'} selector={'Packs'} />

      <input type="text" onChange={onChangeHandler} />


 

      <Button onClick={handlerLogout}>Log OUT</Button>


      <div className={s.packsContainer}>
        {packs?.cardPacks?.map(p => {
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
        })}
      </div>
    </div>
  )
}
