import React, { useEffect } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'components/modal/delete-pack-modal/DeletePackModal.module.scss'
import { useDeleteCardMutation } from 'modules/cards/cardsApi'
import { cardIdSelector, questionContentSelector } from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'

export const DeleteCardModal = () => {
  const [deleteCard, { isLoading }] = useDeleteCardMutation()
  const cardId = useTypedSelector(cardIdSelector)
  const question = useTypedSelector(questionContentSelector)
  const dispatch = useTypedDispatch()

  const deleteCardHandler = async () => {
    await deleteCard(cardId).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  const deleteCardOnEnter = (e: KeyboardEvent) => {
    e.key === 'Enter' && deleteCardHandler()
  }

  useEffect(() => {
    document.addEventListener('keyup', deleteCardOnEnter)

    return () => document.removeEventListener('keyup', deleteCardOnEnter)
  }, [])

  return (
    <>
      <p className={s.text}>
        Do you really want to remove <span className={s.packName}>{question}</span> card?
      </p>

      <Button
        styleType="warn"
        onClick={deleteCardHandler}
        disabled={isLoading}
        className={s.button}
      >
        Delete
      </Button>
    </>
  )
}
