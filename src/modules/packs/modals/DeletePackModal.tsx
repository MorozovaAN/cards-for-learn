import React, { FC } from 'react'

import s from './Modals.module.scss'

import { useDeletePackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'

type DeletePackProps = {
  packId: string
  name: string
}
export const DeletePackModal: FC<DeletePackProps> = ({ packId, name }) => {
  const [deletePack] = useDeletePackMutation()
  const handleDeletePack = () => {
    deletePack(packId).unwrap()
  }

  return (
    <div>
      <h2>Delete Pack</h2>
      <p>
        Do you really want to remove <span className={s.namePack}>{name}</span>? All cards will be
        deleted.
      </p>
      <Button styleType="warn" onClick={handleDeletePack}>
        Delete
      </Button>
    </div>
  )
}
