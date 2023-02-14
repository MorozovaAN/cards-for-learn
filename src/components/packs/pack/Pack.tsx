import React, { FC, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './Pack.module.scss'

import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/teach.svg'
import { UpdatePackName } from 'modules/packs/modals/UpdatePackName'
import { Button } from 'UI/button/Button'

type PackType = {
  packId: string
  name: string
  cardsCount: number
  author: string
  updated: string
}

export const Pack: FC<PackType> = ({ packId, name, cardsCount, author, updated }) => {
  const [toggle, setToggle] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const packIdFromParams = searchParams.get('id') as string
  const nameFromParams = searchParams.get('namePack') as string

  const handleTogglePack = () => {
    setToggle(!toggle)
    setSearchParams({ namePack: name, id: packId })
  }

  return (
    <div className={s.pack}>
      <p className={s.name}>{name}</p>

      <p>
        <span className={s.subtitle}>Cards in pack: </span>
        {cardsCount}
      </p>

      <p>
        <span className={`${s.subtitle} ${s.creator}`}>Create by: </span>
        {author}
      </p>

      <p>
        <span className={s.subtitle}>Last Updated: </span>
        {updated}
      </p>

      <Button styleType="primary" className={s.button}>
        <p>Learn this pack</p> <LearnIcon width="16" />
      </Button>

      <Button styleType="primary" onClick={handleTogglePack}>
        <EditIcon width="16" />
      </Button>
      {/*{toggle && <UpdatePackName packId={packId} name={name} />}*/}
      {toggle && <UpdatePackName packId={packIdFromParams} name={nameFromParams} />}
    </div>
  )
}
