import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useDebounce } from 'common/utils/useDebounce'
import { paramsHelper } from 'modules/packs/paramsHelper'
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
    searchParams.delete('sortPacks')
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ ...paramsHelper({ searchParams }), packName: debouncedValue })
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

  // useEffect(() => {
  //   if (props.value === '') setValue(props.value)
  // }, [props.value]) //todo спросить зачем это

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
