import { ChangeEvent, FC } from 'react'

import Pagination from '@mui/material/Pagination'
import { useLocation, useSearchParams } from 'react-router-dom'

import s from './Paginator.module.scss'

import { setSkeletonsNumbers } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Select } from 'UI/select/Select'

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
  const dispatch = useTypedDispatch()
  let location = useLocation()
  const pages = Math.ceil(totalCount / pageCount)
  const selectOptions = ['6', '9', '12', '15']
  const selectValue =
    searchParams.has('user_id') && !location.pathname.includes('cards')
      ? (pageCount + 1).toString()
      : pageCount.toString()

  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ ...paramsHelper(searchParams), page: page.toString() })
  }

  const changeNumberPacksPerPageHandler = (value: string) => {
    dispatch(setSkeletonsNumbers(value))
    searchParams.has('page') && searchParams.delete('page')
    setSearchParams({
      ...paramsHelper(searchParams),
      pageCount: searchParams.has('user_id') ? (Number(value) - 1).toString() : value,
    })
  }

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
            backgroundColor: '#017c6e',
            color: '#ffffff',
            pointerEvents: 'none',
          },
        }}
      />

      <p className={s.showPerPage}>Show</p>

      <Select
        value={selectValue}
        onChangeCallback={changeNumberPacksPerPageHandler}
        options={selectOptions}
        disabled={disabled}
      />

      <p className={s.showPerPage}>packs per page</p>
    </div>
  )
}
