import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { sortingPacksMethods } from 'common/constants/sortingMethods'

type ParamsHelperType = {
  searchParams: URLSearchParams
}

export const paramsHelper = ({ searchParams }: ParamsHelperType) => {
  let baseQueryParams: BaseQueryParamsType = searchParams.has('user_id')
    ? { pageCount: '6' }
    : {
        pageCount: '6',
        min: '5',
        sortPacks: searchParams.get('sortPacks') || sortingPacksMethods.desCardsCount,
      }

  searchParams.forEach((value, key) => {
    // @ts-ignore //todo
    baseQueryParams[key] = value
  })

  return baseQueryParams
}
