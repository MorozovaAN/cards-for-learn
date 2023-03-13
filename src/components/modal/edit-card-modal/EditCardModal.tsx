import React, { ChangeEvent, useRef, useState } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { uploadImage } from 'common/utils/uploadImage'
import s from 'components/modal/edit-card-modal/EditCardModule.module.scss'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import {
  answerSelector,
  cardIdSelector,
  questionImgSelector,
  questionTextSelector,
  questionTypeSelector,
} from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const EditCardModal = () => {
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const dispatch = useTypedDispatch()

  const cardId = useTypedSelector(cardIdSelector)
  const questionType = useTypedSelector(questionTypeSelector)
  const questionText = useTypedSelector(questionTextSelector)
  const questionImg = useTypedSelector(questionImgSelector)
  const answer = useTypedSelector(answerSelector)

  const [questionTextValue, setQuestionTextValue] = useState(questionText)
  const [questionImgValue, setQuestionImgValue] = useState(questionImg)
  const [answerValue, setAnswerValue] = useState(answer)
  const inputRef = useRef<HTMLInputElement>(null)

  const editCardHandler = async () => {
    await updateCard({
      card: {
        _id: cardId,
        answer: answerValue,
        questionImg: questionImgValue,
        question: questionTextValue,
      },
    })
    dispatch(setModal({ open: false, type: '' }))
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestionTextValue(e.currentTarget.value)

  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setAnswerValue(e.currentTarget.value)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImage(e, dispatch, setQuestionImgValue)
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <>
      {questionType === 'Image' ? (
        <div className={s.imgContainer}>
          {questionImgValue && (
            <div className={s.imgBox}>
              <img src={questionImgValue} alt="question image" className={s.img} />
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
          value={questionTextValue}
          onChange={changeQuestionHandler}
          label="Question"
          limit={400}
          symbols={questionTextValue.trim().length}
        />
      )}

      <Textarea
        value={answerValue}
        onChange={changeAnswerHandler}
        label="Answer"
        limit={800}
        symbols={answerValue.trim().length}
      />

      <Button
        className={s.button}
        onClick={editCardHandler}
        disabled={
          (questionType === 'Image' ? !questionImgValue : !questionTextValue.trim().length) ||
          !answerValue.trim().length ||
          isLoading
        }
        styleType="primary"
      >
        Save
      </Button>
    </>
  )
}
