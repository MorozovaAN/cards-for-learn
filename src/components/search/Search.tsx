import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { paramsHelper } from 'common/utils/paramsHelper'
import { useDebounce } from 'common/utils/useDebounce'
import { Input } from 'UI/input/Input'

type SearchType = {
  disabled: boolean
  selector: string
  param: string
}

export const Search: FC<SearchType> = ({ disabled, selector, param }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get(`${param}`))
  const [over, setOver] = useState(false)
  const debouncedValue = useDebounce(value)

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (debouncedValue && selector === 'Packs') {
      setSearchParams({ ...paramsHelper(searchParams), packName: debouncedValue })
    }
    if (debouncedValue && selector === 'Cards') {
      setSearchParams({ ...paramsHelper(searchParams), cardQuestion: debouncedValue })
    }
  }, [debouncedValue])

  useEffect(() => {
    if (!searchParams.has(`${param}`)) setValue('')
  }, [searchParams])

  useEffect(() => {
    if (!value && over) {
      searchParams.delete(`${param}`)
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
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    />
  )
}
