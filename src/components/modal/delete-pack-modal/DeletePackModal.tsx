import React from 'react'

import { useNavigate } from 'react-router-dom'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'components/modal/delete-pack-modal/DeletePackModal.module.scss'
import { idSelector } from 'modules/auth/authSelectors'
import { useDeletePackMutation } from 'modules/packs/packsApi'
import { packIdSelector, packNameSelector } from 'modules/packs/packsSelectors'
import { Button } from 'UI/button/Button'

export const DeletePackModal = () => {
  const [deletePack, { isLoading }] = useDeletePackMutation()
  const packId = useTypedSelector(packIdSelector)
  const packName = useTypedSelector(packNameSelector)
  const myId = useTypedSelector(idSelector)
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const deletePackHandler = async () => {
    await deletePack(packId).unwrap()
    dispatch(setModal({ open: false, type: '' }))
    navigate(`/packs/?user_id=${myId}`)
  }

  /* const deletePackOnEnter = (e: KeyboardEvent<HTMLButtonElement>) => {
    e.key === 'Enter' && deletePackHandler()
  }*/

  /*useEffect(() => {
    document.addEventListener('keyup', deletePackOnEnter)

    return () => document.removeEventListener('keyup', deletePackOnEnter)
  }, [])*/

  return (
    <>
      <p className={s.text}>
        Do you really want to remove pack <span className={s.packName}>{packName}</span>? All cards
        in the pack will be removed.
      </p>

      <Button
        styleType="warn"
        onClick={deletePackHandler}
        disabled={isLoading}
        className={s.button}
        autoFocus={true}
      >
        Delete
      </Button>
    </>
  )
}
