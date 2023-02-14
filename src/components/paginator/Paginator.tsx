import { ChangeEvent, FC } from 'react'

import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import s from './Paginator.module.scss'

type PaginationPropsType = {
  pageCount: number
  totalCount: number
  currentPage: number
  setPageCallback: (property: string, page: string) => void
  setRowCallback: (property: string, pageCount: string) => void
  disabled: boolean
}
export const Paginator: FC<PaginationPropsType> = ({
  pageCount,
  totalCount,
  setPageCallback,
  setRowCallback,
  currentPage,
  disabled,
}) => {
  const pages = Math.ceil(totalCount / pageCount)
  const pageValue = pageCount.toString()

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setPageCallback('page', page.toString())
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowCallback('pageCount', event.target.value)
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
