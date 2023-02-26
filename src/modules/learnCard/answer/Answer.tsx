import React, { FC, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { Button } from '../../../UI/button/Button'
import { useUpdateCardGradeMutation } from '../../cards/cardsApi'

import s from './Answer.module.scss'

type CardAnswerType = {
  answer: string
  card_id: string
  handelNextCard: () => void
}
export const Answer: FC<CardAnswerType> = ({ answer, handelNextCard, card_id }) => {
  const [answerGrade] = useUpdateCardGradeMutation()
  const [value, setValue] = useState('1')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const handelSubmit = async () => {
    const grade = Number(value)

    await answerGrade({ grade, card_id })
    handelNextCard()
  }

  return (
    <>
      <h3 className={s.title}>
        Answer: <span className={s.subtitle}>{answer}</span>
      </h3>

      <div>
        <FormControl>
          <RadioGroup
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            sx={{
              '.css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked': {
                color: '#017C6EFF',
              },
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="Did not know" />
            <FormControlLabel value="2" control={<Radio />} label="Forgot" />
            <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
            <FormControlLabel value="4" control={<Radio />} label="Knew partially" />
            <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
          </RadioGroup>
        </FormControl>
      </div>

      <Button styleType="primary" onClick={handelSubmit}>
        Next
      </Button>
    </>
  )
}
