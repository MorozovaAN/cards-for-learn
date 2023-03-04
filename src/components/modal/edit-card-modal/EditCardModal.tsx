import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { SelectQuestion } from 'common/select-question/SelectQuestion'
import { uploadImage } from 'common/utils/uploadImage'
import s from 'components/modal/edit-card-modal/EditCardModule.module.scss'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import {
  answerSelector,
  cardIdSelector,
  questionContentSelector,
  questionTypeSelector,
} from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const EditCardModal = () => {
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const dispatch = useTypedDispatch()
  const cardId = useTypedSelector(cardIdSelector)
  const questionType = useTypedSelector(questionTypeSelector)
  const questionContent = useTypedSelector(questionContentSelector)
  const answer = useTypedSelector(answerSelector)

  const [questionValue, setQuestionValue] = useState(questionContent)
  const [answerValue, setAnswerValue] = useState(answer)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setQuestionValue(questionContent)
  }, [questionContent])

  const editCardHandler = async () => {
    await updateCard({
      card: {
        _id: cardId,
        answer: answerValue,
        questionImg: questionValue,
        question: questionValue,
      },
    })
    dispatch(setModal({ open: false, type: '' }))
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestionValue(e.currentTarget.value)

  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setAnswerValue(e.currentTarget.value)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImage(e, dispatch, setQuestionValue)
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <>
      <div className={s.selectContainer}>
        <p className={s.selectTitle}>Question format:</p>
        <SelectQuestion disabled={isLoading} />
      </div>

      {questionType === 'Image' ? (
        <div className={s.imgContainer}>
          {questionValue && (
            <div className={s.imgBox}>
              <img src={questionValue} alt="question image" className={s.img} />
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
        <Textarea
          autoFocus
          value={questionValue}
          onChange={changeQuestionHandler}
          error={!questionValue.length ? 'Please, write your question' : ''}
          label="Question"
        />
      )}

      <Textarea
        autoFocus
        value={answerValue}
        onChange={changeAnswerHandler}
        error={!answerValue.length ? 'Please, write your answer' : ''}
        label="Answer"
      />

      <Button
        className={s.button}
        onClick={editCardHandler}
        disabled={!questionValue || !answerValue || isLoading}
        styleType="primary"
      >
        Save
      </Button>
    </>
  )
}
