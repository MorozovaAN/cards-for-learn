import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './ResetAllFilters.module.scss'

import defaultFilters from 'assets/img/icons/reset-all-filters.svg'
import { Button } from 'UI/button/Button'

type ResetAllFiltersType = {
  disabled: boolean
}

export const ResetAllFilters: FC<ResetAllFiltersType> = ({ disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const resetFiltersHandler = () => {
    const userId = searchParams.get('user_id') as string

    if (userId) setSearchParams({ user_id: userId })
    else setSearchParams({})
  }

  return (
    <Button className={s.button} styleType="icon" onClick={resetFiltersHandler} disabled={disabled}>
      <div className={s.tooltip} data-tooltip="reset all filters">
        <img src={defaultFilters} alt="reset all filters icon" />
      </div>
    </Button>
  )
}
