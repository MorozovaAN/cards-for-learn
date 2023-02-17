import { BaseQueryParamsType } from 'common/constants/baseQueryParams'

export const paramsHelper = (searchParams: URLSearchParams) => {
  const params: BaseQueryParamsType = [...searchParams.entries()].reduce(
    (acc, [param, value]) => ({
      ...acc,
      [param]: value,
    }),
    {}
  )

  return params
}
