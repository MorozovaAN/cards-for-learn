import React, { useEffect } from 'react'

import s from './DeletePackModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDeletePackMutation } from 'modules/packs/packsApi'
import { packIdSelector, packNameSelector } from 'modules/packs/packsSelectors'
import { Button } from 'UI/button/Button'

export const DeletePackModal = () => {
  const [deletePack, { isLoading }] = useDeletePackMutation()
  const packId = useTypedSelector(packIdSelector)
  const packName = useTypedSelector(packNameSelector)
  const dispatch = useTypedDispatch()

  const deletePackHandler = async () => {
    await deletePack(packId).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  const deletePackOnEnter = (e: KeyboardEvent) => {
    e.key === 'Enter' && deletePackHandler()
  }

  useEffect(() => {
    document.addEventListener('keyup', deletePackOnEnter)

    return () => document.removeEventListener('keyup', deletePackOnEnter)
  }, [])

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
