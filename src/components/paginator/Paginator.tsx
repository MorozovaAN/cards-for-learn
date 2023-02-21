import { ChangeEvent, FC, ForwardedRef, forwardRef, RefAttributes } from 'react'

import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled'
import Pagination from '@mui/material/Pagination'
import { useSearchParams } from 'react-router-dom'

import s from './Paginator.module.scss'

import { paramsHelper } from 'common/utils/paramsHelper'
import {
  StyledButton,
  StyledListbox,
  StyledOption,
  StyledPopper,
} from 'components/paginator/PaginatorStyledComponent'

type PaginationPropsType = {
  pageCount: number
  totalCount: number
  currentPage: number
  disabled: boolean
}

export const Paginator: FC<PaginationPropsType> = ({
  pageCount,
  totalCount,
  currentPage,
  disabled,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pages = Math.ceil(totalCount / pageCount)

  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ ...paramsHelper(searchParams), page: page.toString() })
  }

  const changeNumberPacksPerPageHandler = (_: any, value: string | null) => {
    searchParams.delete('page')
    if (searchParams.has('user_id')) {
      setSearchParams({
        ...paramsHelper(searchParams),
        pageCount: (Number(value) - 1).toString(),
      })
    } else {
      if (value) {
        setSearchParams({
          ...paramsHelper(searchParams),
          pageCount: value,
        })
      }
    }
  }

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
    <div className={s.paginatorContainer}>
      <Pagination
        onChange={changePageHandler}
        count={pages}
        page={currentPage}
        disabled={disabled}
        size="small"
        shape="rounded"
        sx={{
          '.MuiPagination-ul': {
            columnGap: '10px',
          },
          '.css-w05zow-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#017C6EFF',
            color: '#ffffff',
            pointerEvents: 'none',
          },
        }}
      />

      <p className={s.showPerPage}>Show</p>

      <CustomSelect
        value={searchParams.has('user_id') ? (pageCount + 1).toString() : pageCount.toString()}
        onChange={changeNumberPacksPerPageHandler}
        disabled={disabled}
      >
        <StyledOption value={'6'}>6</StyledOption>
        <StyledOption value={'9'}>9</StyledOption>
        <StyledOption value={'12'}>12</StyledOption>
        <StyledOption value={'15'}>15</StyledOption>
      </CustomSelect>

      <p className={s.showPerPage}>packs per page</p>
    </div>
  )
}
