import { ChangeEvent, FC } from 'react'

import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useSearchParams } from 'react-router-dom'

import s from './Paginator.module.scss'

import { paramsHelper } from 'modules/packs/paramsHelper'

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
  const pageValue = pageCount.toString()
  const p = paramsHelper({ searchParams })

  console.log(p)

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ ...paramsHelper({ searchParams }), page: page.toString() })
    // searchParams.append('page', page.toString())
    // setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setSearchParams({ ...p, pageCount: event.target.value })
    // searchParams.append('pageCount', event.target.value)
    // setSearchParams(searchParams)
  }

  return (
    <div className={s.paginatorContainer}>
      <Pagination
        disabled={disabled}
        onChange={handleChangePage}
        count={pages}
        page={currentPage}
        size="small"
        shape="rounded"
        /*classes={{ ul: s.pagination }}*/
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

      <div className={s.showPerPage}>
        <p className={s.nameShowPerPage}>Show</p>

        <Select
          disabled={disabled}
          sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}
          value={pageValue}
          onChange={handleChangeRowsPerPage}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
        <p className={s.nameShowPerPage}>packs per page</p>
      </div>
    </div>
  )
}
