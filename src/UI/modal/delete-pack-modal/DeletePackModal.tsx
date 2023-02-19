import React from 'react'

import s from './DeletePackModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDeletePackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'

export const DeletePackModal = () => {
  const [deletePack, { isLoading }] = useDeletePackMutation()
  const packId = useTypedSelector(state => state.packs.packId)
  const packName = useTypedSelector(state => state.packs.packName)
  const dispatch = useTypedDispatch()

  const deletePackHandler = async () => {
    await deletePack(packId).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  return (
    <>
      <div>
        <p className={s.text}>
          Do you really want to remove pack <span className={s.packName}>{packName}</span>?
        </p>
        <p>All cards in the pack will be removed</p>
      </div>

      <Button
        styleType="warn"
        onClick={deletePackHandler}
        disabled={isLoading}
        className={s.button}
      >
        Delete
      </Button>
    </>
  )
}
