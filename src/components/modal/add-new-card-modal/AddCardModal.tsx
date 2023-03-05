import React, { ChangeEvent, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './AddNewCardModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { SelectQuestion } from 'common/select-question/SelectQuestion'
import { uploadImage } from 'common/utils/uploadImage'
import { useAddNewCardMutation } from 'modules/cards/cardsApi'
import { questionTypeSelector } from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const AddCardModal = () => {
  const [addCard, { isLoading }] = useAddNewCardMutation()
  const [searchParams] = useSearchParams()
  const dispatch = useTypedDispatch()

  const questionType = useTypedSelector(questionTypeSelector)
  const [question, setQuestion] = useState('')
  const [questionImg, setQuestionImg] = useState('')
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const id = searchParams.get('cardsPack_id')

  const addCardHandler = async () => {
    await addCard({ card: { cardsPack_id: id ? id : '', question, answer, questionImg } })
    dispatch(setModal({ open: false, type: '' }))
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)

  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) =>
    uploadImage(e, dispatch, setQuestionImg)

  const selectFileHandler = () => inputRef && inputRef.current?.click()

  return (
    <>
      <div className={s.questionContainer}>
        <div className={s.selectContainer}>
          <p className={s.selectTitle}>Question format:</p>
          <SelectQuestion disabled={isLoading} />
        </div>

        {questionType === 'Image' ? (
          <div className={s.imgContainer}>
            {questionImg && (
              <div className={s.imgBox}>
                <img src={questionImg} alt="question image" className={s.img} />
              </div>
            )}

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
          </div>
        ) : (
          <Textarea value={question} onChange={changeQuestionHandler} autoFocus label="Question" />
        )}
      </div>

      <Textarea value={answer} onChange={changeAnswerHandler} label="Answer" />

      <Button
        disabled={(questionType === 'Image' ? !questionImg : !question) || !answer || isLoading}
        styleType="primary"
        className={s.button}
        onClick={addCardHandler}
      >
        Save
      </Button>
    </>
  )
}
