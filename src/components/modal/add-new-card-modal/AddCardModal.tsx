import React, { ChangeEvent, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { uploadImage } from 'common/utils/uploadImage'
import s from 'components/modal/add-new-card-modal/AddNewCardModal.module.scss'
import { useAddNewCardMutation } from 'modules/cards/cardsApi'
import { Button } from 'UI/button/Button'
import { Select } from 'UI/select/Select'
import { Textarea } from 'UI/textarea/Textarea'

export const AddCardModal = () => {
  const [addCard, { isLoading }] = useAddNewCardMutation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [button, setButton] = useState(false)
  const [questionImg, setQuestionImg] = useState('')
  const [selectValue, setSelectValue] = useState('Text')
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

  const onSelectChangeHandler = (value: string) => {
    setSelectValue(value)
    value === 'Text' && setButton(false)
    value === 'Image' && setButton(true)
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImage(e, dispatch, setQuestionImg)
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <>
      <div className={s.questionContainer}>
        <div className={s.selectContainer}>
          <p className={s.selectTitle}>Question format:</p>

          <Select
            value={selectValue}
            onChangeCallback={onSelectChangeHandler}
            options={['Text', 'Image']}
            disabled={isLoading}
          />
        </div>

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

            <div className={s.imgBox}>
              <img width="70" src={questionImg} alt="pre img" />
            </div>
          </label>
        ) : (
          <Textarea value={question} onChange={changeQuestionHandler} autoFocus label="Question" />
        )}
      </div>

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
