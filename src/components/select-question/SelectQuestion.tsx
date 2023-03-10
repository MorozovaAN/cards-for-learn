import React, { FC, memo } from 'react'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { questionTypeSelector } from 'modules/cards/cardsSelectors'
import { QuestionTypeType, setQuestionType } from 'modules/cards/cardsSlise'
import { Select } from 'UI/select/Select'

type SelectQuestionType = {
  disabled: boolean
}

export const SelectQuestion: FC<SelectQuestionType> = memo(({ disabled }) => {
  const questionType = useTypedSelector(questionTypeSelector)
  const dispatch = useTypedDispatch()

  const onSelectChangeHandler = (value: string) => {
    dispatch(setQuestionType(value as QuestionTypeType))
  }

  return (
    <Select
      value={questionType}
      onChangeCallback={onSelectChangeHandler}
      options={['Text', 'Image']}
      disabled={disabled}
    />
  )
})
