import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { sortingPacksMethods } from 'common/constants/sortingMethods'

type ParamsHelperType = {
  searchParams: URLSearchParams
}

export const paramsHelper = ({ searchParams }: ParamsHelperType) => {
  let baseQueryParams: BaseQueryParamsType = {
    pageCount: '6',
    min: '5',
    sortPacks: searchParams.get('sortPacks') || sortingPacksMethods.desCardsCount,
  }

  if (searchParams.has('pageCount')) baseQueryParams.pageCount = searchParams.get('pageCount')
  if (searchParams.has('page')) baseQueryParams.page = searchParams.get('page')
  if (searchParams.has('min')) baseQueryParams.min = searchParams.get('min')
  if (searchParams.has('max')) baseQueryParams.max = searchParams.get('max')
  if (searchParams.has('user_id')) baseQueryParams.user_id = searchParams.get('user_id')
  if (searchParams.has('packName')) baseQueryParams.packName = searchParams.get('packName')
  if (searchParams.has('sortPacks')) baseQueryParams.sortPacks = searchParams.get('sortPacks')

  return baseQueryParams
}
