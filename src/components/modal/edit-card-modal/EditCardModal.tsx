import React, { ChangeEvent, useCallback, useRef, useState } from 'react'

import { uploadImage } from '../../../common/utils/uploadImage'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { SelectQuestion } from 'common/selectQuestion/SelectQuestion'
import s from 'components/modal/edit-card-modal/EditCardModule.module.scss'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import { answerSelector, cardIdSelector, questionSelector } from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const EditCardModal = () => {
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const cardId = useTypedSelector(cardIdSelector)
  const question = useTypedSelector(questionSelector)
  const answer = useTypedSelector(answerSelector)
  const questionImg = useTypedSelector(state => state.cards.questionImg)
  const [questionValue, setQuestionValue] = useState(question)
  const [answerValue, setAnswerValue] = useState(answer)
  const dispatch = useTypedDispatch()
  const [button, setButton] = useState(false)
  const [questionImgValue, setQuestionImg] = useState(questionImg)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectValue, setSelectValue] = useState('Text')

  const editCardHandler = async () => {
    await updateCard({
      card: {
        _id: cardId,
        question: questionValue,
        answer: answerValue,
        questionImg: questionImgValue,
      },
    })
    dispatch(setModal({ open: false, type: '' }))
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestionValue(e.currentTarget.value)

  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setAnswerValue(e.currentTarget.value)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImage(e, dispatch, setQuestionImg)
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <>
      <div className={s.selectContainer}>
        <p className={s.selectTitle}>Question format:</p>
        <SelectQuestion
          disabled={isLoading}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          setButton={setButton}
          questionImg={questionImgValue}
        />
      </div>

      {button ? (
        <label className={s.label}>
          <div className={s.imgBox}>
            <img width="70" src={questionImgValue} alt="" />
          </div>
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
        disabled={
          !questionValue ||
          !answerValue ||
          isLoading ||
          (selectValue === 'Image' && !questionImgValue)
        }
        styleType="primary"
      >
        Save
      </Button>
    </>
  )
}
