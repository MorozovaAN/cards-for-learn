import { sortingPacksMethods } from 'common/constants/sortingMethods'

export const baseQueryParams: BaseQueryParamsType = {
  pageCount: 8,
  page: 1,
  min: 5,
  max: 110,
  user_id: '',
  packName: '',
  sortPacks: sortingPacksMethods.desUpdate,
}
export type ParamsType = {
  pageCount: number
  page: number
  min: number
  max: number
  user_id: string
  packName: string
  sortPacks: string
}
export type BaseQueryParamsType = Partial<ParamsType>
