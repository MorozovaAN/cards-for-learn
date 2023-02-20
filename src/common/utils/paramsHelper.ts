import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { GetCardsRequestType } from 'modules/cards/cardsApi'

export const paramsHelper = (searchParams: URLSearchParams) => {
  const params: BaseQueryParamsType & GetCardsRequestType = [...searchParams.entries()].reduce(
    (acc, [param, value]) => ({
      ...acc,
      [param]: value,
    }),
    {}
  )

  return params
}
