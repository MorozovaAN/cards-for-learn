import React, { ChangeEvent, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { uploadImage } from 'common/utils/uploadImage'
import s from 'components/modal/add-new-card-modal/AddNewCardModal.module.scss'
import { useAddNewCardMutation } from 'modules/cards/cardsApi'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const AddCardModal = () => {
  const [addCard, { isLoading }] = useAddNewCardMutation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [button, setButton] = useState(false)
  const [questionImg, setQuestionImg] = useState('')
  const dispatch = useTypedDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('cardsPack_id')

  const addCardHandler = async () => {
    await addCard({ card: { cardsPack_id: id ? id : '', question, answer, questionImg } })
    dispatch(setModal({ open: false, type: '' }))
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)

  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)

  const onSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    e.currentTarget.selectedIndex === 0 && setButton(false)
    e.currentTarget.selectedIndex === 1 && setButton(true)
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImage(e, dispatch, setQuestionImg)
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <>
      <select onChange={onSelectChangeHandler}>
        <option value="0">Text</option>
        <option value="1">Image</option>
      </select>

      {button ? (
        <label className={s.label}>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={uploadHandler}
            ref={inputRef}
            accept=".jpg,.png,.svg,.jpeg"
          />
          <Button styleType="primary" onClick={selectFileHandler} className={s.button}>
            Upload image
          </Button>
        </label>
      ) : (
        <Textarea value={question} onChange={changeQuestionHandler} autoFocus label="Question" />
      )}

      <Textarea value={answer} onChange={changeAnswerHandler} label="Answer" />

      <Button
        disabled={(!question && !questionImg) || !answer || isLoading}
        styleType="primary"
        className={s.button}
        onClick={addCardHandler}
      >
        Save
      </Button>
    </>
  )
}
