import React, { FC, ForwardedRef, forwardRef, RefAttributes } from 'react'

import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled'

import { StyledButton, StyledListbox, StyledOption, StyledPopper } from './SelectStyledComponents'

type SelectType = {
  options: string[]
  value: string
  onChangeCallback: (value: string) => void
  disabled: boolean
}

export const Select: FC<SelectType> = ({ options, value, onChangeCallback, disabled }) => {
  const onChangeHandler = (_: any, value: string | null) => {
    value && onChangeCallback(value)
  }

  console.log('select')
  const CustomSelect = forwardRef(function CustomSelect<TValue extends {}>(
    props: SelectUnstyledProps<TValue>,
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    const slots: SelectUnstyledProps<TValue>['slots'] = {
      root: StyledButton,
      listbox: StyledListbox,
      popper: StyledPopper,
      ...props.slots,
    }

    return <SelectUnstyled {...props} ref={ref} slots={slots} />
  }) as <TValue extends {}>(
    props: SelectUnstyledProps<TValue> & RefAttributes<HTMLButtonElement>
  ) => JSX.Element

  return (
    <CustomSelect value={value} onChange={onChangeHandler} disabled={disabled}>
      {options.map(el => (
        <StyledOption value={el} key={el}>
          {el}
        </StyledOption>
      ))}
    </CustomSelect>
  )
}
