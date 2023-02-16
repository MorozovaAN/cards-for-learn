import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './MyOtherButtons.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Button } from 'UI/button/Button'

export const MyOtherButtons = () => {
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
