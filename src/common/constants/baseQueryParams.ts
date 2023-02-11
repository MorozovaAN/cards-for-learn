import { sortingPacksMethods } from 'common/constants/sortingMethods'

export const baseQueryParams: BaseQueryParamsType = {
  pageCount: 5,
  page: 1,
  min: 0,
  max: 110,
  user_id: '',
  packName: '',
  sortPacks: sortingPacksMethods.desUpdate,
}
export type BaseQueryParamsType = {
  pageCount: number
  page: number
  min: number
  max: number
  user_id: string
  packName: string
  sortPacks: string
}
