import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { sortingPacksMethods } from 'common/constants/sortingMethods'

type ParamsHelperType = {
  searchParams: URLSearchParams
}

export const paramsHelper = ({ searchParams }: ParamsHelperType) => {
  let baseQueryParams: BaseQueryParamsType = {
    pageCount: Number(searchParams.get('pageCount')) || 6,
    page: Number(searchParams.get('page')) || 1,
    min: Number(searchParams.get('min')) || 0,
    max: Number(searchParams.get('max')) || 110,
    user_id: searchParams.get('user_id') || '',
    packName: searchParams.get('packName') || '',
    sortPacks: searchParams.get('sortPacks') || sortingPacksMethods.desUpdate,
  }

  return baseQueryParams
}
