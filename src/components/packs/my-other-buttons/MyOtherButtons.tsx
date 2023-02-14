import React, { FC } from 'react'

import s from './MyOtherButtons.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Button } from 'UI/button/Button'

type MyOtherButtonsType = {
  myPacks: string | null
  onChange: (property: string, value: string) => void
}

export const MyOtherButtons: FC<MyOtherButtonsType> = ({ onChange, myPacks }) => {
  const myId = useTypedSelector(state => state.auth.id)

  const btnMyOnClickHandler = () => {
    onChange('user_id', myId ? myId : '')
  }

  const btnOtherOnClickHandler = () => {
    onChange('user_id', '')
  }

  return (
    <div className={s.buttonsContainer}>
      <Button
        styleType={myPacks ? 'primary' : 'secondary'}
        className={s.btnMy}
        onClick={btnMyOnClickHandler}
      >
        My
      </Button>

      <Button
        styleType={myPacks ? 'secondary' : 'primary'}
        className={s.btnOther}
        onClick={btnOtherOnClickHandler}
      >
        Other
      </Button>
    </div>
  )
}
