import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDebounce } from 'common/utils/useDebounce'
import { Input } from 'UI/input/Input'

type SearchType = {
  class?: string
  selector: string
  onChange: (property: string, value: string) => void
}

export const Search: FC<SearchType> = props => {
  const disabled = useTypedSelector(state => state.app.isLoading)
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    props.onChange('packName', debouncedValue)
  }, [debouncedValue])

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
