import React, { useEffect } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'components/modal/delete-pack-modal/DeletePackModal.module.scss'
import { packsApi } from 'modules'
import { useDeleteCardMutation } from 'modules/cards/cardsApi'
import {
  cardIdSelector,
  questionImgSelector,
  questionTextSelector,
  questionTypeSelector,
} from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'

export const DeleteCardModal = () => {
  const [deleteCard, { isLoading }] = useDeleteCardMutation()
  const dispatch = useTypedDispatch()

  const cardId = useTypedSelector(cardIdSelector)
  const questionType = useTypedSelector(questionTypeSelector)
  const questionText = useTypedSelector(questionTextSelector)
  const questionImg = useTypedSelector(questionImgSelector)

  const deleteCardHandler = async () => {
    dispatch(packsApi.util.invalidateTags(['packs']))
    await deleteCard(cardId).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  const deleteCardOnEnter = (e: KeyboardEvent) => e.key === 'Enter' && deleteCardHandler()

  useEffect(() => {
    document.addEventListener('keyup', deleteCardOnEnter)

    return () => document.removeEventListener('keyup', deleteCardOnEnter)
  }, [])

  return (
    <>
      {questionType === 'Text' ? (
        <p className={s.text}>
          Do you really want to remove
          <span className={s.packName}> {questionText} </span>
          card?
        </p>
      ) : (
        <div className={s.imgContainer}>
          <div className={s.imgBox}>
            <img src={questionImg} alt="question image" className={s.img} />
          </div>
          <p className={s.text}> Do you really want to remove this cards?</p>
        </div>
      )}

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
