import React, { FC, useEffect, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { isLoadingSelector } from 'app/appSelectors'
import { setIsLoading } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useUpdateCardGradeMutation } from 'modules/cards/cardsApi'
import s from 'modules/cards/learn-cards/answer/Answer.module.scss'
import { Button } from 'UI/button/Button'

type CardAnswerType = {
  answer: string
  card_id: string
  handelNextCard: () => void
}
export const Answer: FC<CardAnswerType> = ({ answer, handelNextCard, card_id }) => {
  const [answerGrade, { isLoading }] = useUpdateCardGradeMutation()
  const dispatch = useTypedDispatch()
  const isAppLoading = useTypedSelector(isLoadingSelector)
  const [value, setValue] = useState('1')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  useEffect(() => {
    isAppLoading && dispatch(setIsLoading(false))

    return () => {
      dispatch(setIsLoading(false))
    }
  }, [])

  const setGradeHandler = async () => {
    dispatch(setIsLoading(true))
    const grade = Number(value)

    await answerGrade({ grade, card_id })
    handelNextCard()
  }

  return (
    <>
      <h3 className={s.subtitle}>
        <span className={s.answer}>Answer: </span>
        {answer}
      </h3>

      <div>
        <h3 className={s.rate}>Rate your answer:</h3>
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
              '.MuiTypography-root': {
                fontSize: '16px',
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

      <Button
        styleType="primary"
        onClick={setGradeHandler}
        className={s.button}
        disabled={isLoading}
      >
        Next
      </Button>
    </>
  )
}
