import React, { FC, forwardRef } from 'react'

import OptionGroupUnstyled, { OptionGroupUnstyledProps } from '@mui/base/OptionGroupUnstyled'
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled'
import { useSearchParams } from 'react-router-dom'

import {
  StyledButton,
  StyledGroupHeader,
  StyledGroupOptions,
  StyledGroupRoot,
  StyledListBox,
  StyledOption,
  StyledPopper,
} from './SortPacksStyledComponents'

import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { paramsHelper } from 'common/utils/paramsHelper'
import s from 'modules/packs/sort/SortPacks.module.scss'
import { setSortLabel } from 'modules/packs/sort/utils/setSortLabel'

type SortPacksType = {
  disabled: boolean
}

export const SortPacks: FC<SortPacksType> = ({ disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user_id')
  const myPacks = userId ? sortingPacksMethods.desUpdate : sortingPacksMethods.desCardsCount
  const sortValue = searchParams.get('sortPacks') ? searchParams.get('sortPacks') : myPacks
  const sortLabel = setSortLabel(sortValue as sortingPacksMethods)

  const selectOnChangeHandler = (_: any, value: string | null) => {
    value && setSearchParams({ ...paramsHelper(searchParams), sortPacks: value })
    if (
      (value === sortingPacksMethods.desCardsCount && !searchParams.has('user_id')) ||
      (value === sortingPacksMethods.desUpdate && searchParams.has('user_id'))
    ) {
      searchParams.delete('sortPacks')
      setSearchParams(searchParams)
    }
  }

  function CustomSelect(props: SelectUnstyledProps<string>) {
    const slots: SelectUnstyledProps<string>['slots'] = {
      root: StyledButton,
      listbox: StyledListBox,
      popper: StyledPopper,
      ...props.slots,
    }

    return <SelectUnstyled {...props} slots={slots} />
  }

  const CustomOptionGroup = forwardRef(function CustomOptionGroup(
    props: OptionGroupUnstyledProps,
    ref: React.ForwardedRef<any>
  ) {
    const slots: OptionGroupUnstyledProps['slots'] = {
      root: StyledGroupRoot,
      label: StyledGroupHeader,
      list: StyledGroupOptions,
      ...props.slots,
    }

    return <OptionGroupUnstyled {...props} ref={ref} slots={slots} />
  })

  return (
    <div>
      <p className={s.sortLabel}> Sort packs by {sortLabel}</p>

      <CustomSelect value={sortValue} onChange={selectOnChangeHandler} disabled={disabled}>
        <CustomOptionGroup label="Sort by pack name">
          <StyledOption value={sortingPacksMethods.desName}>from A to Z</StyledOption>
          <StyledOption value={sortingPacksMethods.ascName}>from Z to A</StyledOption>
        </CustomOptionGroup>

        <CustomOptionGroup label="Sort by cards count">
          <StyledOption value={sortingPacksMethods.desCardsCount}>
            from largest to smallest
          </StyledOption>
          <StyledOption value={sortingPacksMethods.ascCardsCount}>
            from smallest to largest
          </StyledOption>
        </CustomOptionGroup>

        <CustomOptionGroup label="Sort by latest update">
          <StyledOption value={sortingPacksMethods.ascUpdate}>late to early</StyledOption>
          <StyledOption value={sortingPacksMethods.desUpdate}>early to late</StyledOption>
        </CustomOptionGroup>

        {!userId && (
          <CustomOptionGroup label="Sort by creator name">
            <StyledOption value={sortingPacksMethods.desUserName}>from A to Z</StyledOption>
            <StyledOption value={sortingPacksMethods.ascUserName}>from Z to A</StyledOption>
          </CustomOptionGroup>
        )}
      </CustomSelect>
    </div>
  )
}
