import { sortingPacksMethods } from 'common/constants/sortingMethods'

export const baseQueryParams: BaseQueryParamsType = {
  pageCount: '8',
  page: '1',
  min: '0',
  max: '110',
  user_id: '',
  packName: '',
  sortPacks: sortingPacksMethods.desUpdate,
}
export type ParamsType = {
  pageCount: string
  page: string
  min: string
  max: string
  user_id: string
  packName: string
  sortPacks: string
}
export type BaseQueryParamsType = Partial<ParamsType>
