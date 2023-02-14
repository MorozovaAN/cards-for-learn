import * as diagnostics_channel from 'diagnostics_channel'

import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDebounce } from 'common/utils/useDebounce'
import { Input } from 'UI/input/Input'

type SearchType = {
  class?: string
  selector: string
  onChange: (property: string, value: string) => void
  value: string | undefined
}

export const Search: FC<SearchType> = props => {
  const disabled = useTypedSelector(state => state.app.isLoading)
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    debouncedValue && props.onChange('packName', debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    if (props.value === '') setValue(props.value)
  }, [props.value])

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
