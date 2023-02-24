import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { uploadImage } from 'common/utils/uploadImage'
import { useAddNewCardMutation } from 'modules/cards/cardsApi'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

export const AddCardModal = () => {
  const [addCard, { isLoading }] = useAddNewCardMutation()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [button, setButton] = useState(false)
  const [questionImg, setQuestionImg] = useState('')
  const dispatch = useTypedDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const [searchParams, _] = useSearchParams()
  const id = searchParams.get('cardsPack_id')
  const addCardHandler = async () => {
    await addCard({ card: { cardsPack_id: id ? id : '', question, answer, questionImg } })
    dispatch(setModal({ open: false, type: '' }))
  }
  const changeQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.currentTarget.value)
  const changeAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(e.currentTarget.value)

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addCardHandler()
  }

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
        <label>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={uploadHandler}
            ref={inputRef}
            accept=".jpg,.png,.svg,.jpeg"
          />
          <Button styleType={'primary'} onClick={selectFileHandler}>
            Upload image
          </Button>
        </label>
      ) : (
        <Input
          value={question}
          onChange={changeQuestionHandler}
          type="text"
          label="Question"
          autoFocus
          onKeyUp={onEnterHandler}
        />
      )}
      <Input
        value={answer}
        onChange={changeAnswerHandler}
        type="text"
        label="Answer"
        onKeyUp={onEnterHandler}
      />

      <Button
        disabled={(!question && !questionImg) || isLoading}
        styleType="primary"
        onClick={addCardHandler}
      >
        Save
      </Button>
    </>
  )
}
