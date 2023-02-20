import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'modules/packs/my-other-buttons/MyOtherButtons.module.scss'
import { Button } from 'UI/button/Button'

type MyOtherButtonsType = {
  disabled: boolean
}

export const MyOtherButtons: FC<MyOtherButtonsType> = ({ disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const myId = useTypedSelector(state => state.auth.id)
  const myPacks = searchParams.has('user_id')

  const btnMyOnClickHandler = () => {
    setSearchParams({ user_id: myId ? myId : '' })
  }

  const btnOtherOnClickHandler = () => {
    searchParams.delete('user_id')
    setSearchParams(searchParams)
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