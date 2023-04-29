import { BaseQueryParamsType } from 'common/constants/base-query-params'
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
