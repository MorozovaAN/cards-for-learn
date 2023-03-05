import React, { FC, memo, useEffect } from 'react'

import { logger } from '@storybook/node-logger'

import { Select } from 'UI/select/Select'
type SelectQuestionType = {
  disabled: boolean
  selectValue: string
  setSelectValue: (value: string) => void
  setButton: (value: boolean) => void
  questionImg: string
}
export const SelectQuestion: FC<SelectQuestionType> = memo(
  ({ disabled, selectValue, setSelectValue, setButton, questionImg }) => {
    const onSelectChangeHandler = (value: string) => {
      setSelectValue(value)
      value === 'Text' && setButton(false)
      value === 'Image' && setButton(true)
    }

    console.log('select question')
    useEffect(() => {
      questionImg && onSelectChangeHandler('Image')
    }, [questionImg])

    return (
      <Select
        value={selectValue}
        onChangeCallback={onSelectChangeHandler}
        options={['Text', 'Image']}
        disabled={disabled}
      />
    )
  }
)
