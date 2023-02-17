import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { paramsHelper } from 'common/utils/paramsHelper'
import { useDebounce } from 'common/utils/useDebounce'
import { Input } from 'UI/input/Input'

type SearchType = {
  selector: string
  disabled: boolean
}

export const Search: FC<SearchType> = ({ selector, disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('packName'))
  const debouncedValue = useDebounce(value)

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ ...paramsHelper(searchParams), packName: debouncedValue })
    }
  }, [debouncedValue])

  useEffect(() => {
    if (!searchParams.has('packName')) setValue('')
  }, [searchParams])

  useEffect(() => {
    if (!value) {
      searchParams.delete('packName')
      setSearchParams(searchParams)
    }
  }, [value])

  return (
    <Input
      type="search"
      onChange={handleSearchValueChange}
      value={value ? value : ''}
      placeholder="Provide your text"
      disabled={disabled}
    />
  )
}
