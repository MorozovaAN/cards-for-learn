import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDebounce } from 'common/utils/useDebounce'
import { Input } from 'UI/input/Input'

type SearchProps = {
  class?: string
  selector: string
}

export const Search: FC<SearchProps> = props => {
  const disabled = useTypedSelector(state => state.app.isLoading)
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  // useEffect(() => {
  //   if (props.selector === 'Packs') {
  //     dispatch(setSearchName(value))
  //   } else {
  //     // dispatch(setCardQuestion(value))
  //   }
  // }, [debouncedValue])

  // useEffect(() => {
  //   if (packName === '') setValue(packName)
  // }, [packName])

  return (
    <Input
      type="search"
      onChange={handleSearchValueChange}
      value={value}
      placeholder="Provide your text"
      className={props.class}
      disabled={disabled}
    />
  )
}
