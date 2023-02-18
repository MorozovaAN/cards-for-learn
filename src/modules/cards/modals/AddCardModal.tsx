import React, { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAddNewCardMutation } from 'modules/cards/cardsApi'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

export const AddCardModal = () => {
  const [addCard] = useAddNewCardMutation()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const [searchParams, _] = useSearchParams()
  const id = searchParams.get('cardsPack_id')
  const handleAddCard = () => {
    addCard({ card: { cardsPack_id: id ? id : '', question, answer } })
  }
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.currentTarget.value)
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(e.currentTarget.value)

  return (
    <>
      <select>
        <option value="0">Text</option>
        <option value="1">Select2</option>
      </select>

      <Input
        value={question}
        onChange={handleChangeQuestion}
        type="text"
        label="Question"
        autoFocus
      />
      <Input value={answer} onChange={handleChangeAnswer} type="text" label="Answer" />

      <Button disabled={!question} styleType="primary" onClick={handleAddCard}>
        Save
      </Button>
    </>
  )
}
