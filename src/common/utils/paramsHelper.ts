import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { GetCardsRequestType } from 'modules/cards/cardsApi'

export const paramsHelper = (searchParams: URLSearchParams, cardsPack_id?: string) => {
  const params: BaseQueryParamsType & GetCardsRequestType = [...searchParams.entries()].reduce(
    (acc, [param, value]) => ({
      ...acc,
      [param]: value,
    }),
    { cardsPack_id: cardsPack_id ? cardsPack_id : '' }
  )

  return params
}
