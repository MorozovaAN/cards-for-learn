import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './MyOtherButtons.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Button } from 'UI/button/Button'

type MyOtherButtonsType = {
  disabled: boolean
}

export const MyOtherButtons: FC<MyOtherButtonsType> = ({ disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const myId = useTypedSelector(state => state.auth.id)
  const myPacks = searchParams.has('user_id')

  const btnMyOnClickHandler = () => {
    setSearchParams({ user_id: myId })
  }

  const btnOtherOnClickHandler = () => {
    setSearchParams({})
  }

  return (
    <div className={s.buttonsContainer}>
      <Button
        styleType={myPacks ? 'primary' : 'secondary'}
        className={s.btnMy}
        onClick={btnMyOnClickHandler}
        disabled={disabled}
      >
        My
      </Button>

      <Button
        styleType={myPacks ? 'secondary' : 'primary'}
        className={s.btnOther}
        onClick={btnOtherOnClickHandler}
        disabled={disabled}
      >
        Other
      </Button>
    </div>
  )
}
