import { sortingPacksMethods } from 'common/constants/sorting-methods'

export const setSortLabel = (value: sortingPacksMethods) => {
  const obj = {
    [sortingPacksMethods.ascName]: 'pack name',
    [sortingPacksMethods.desName]: 'pack name',
    [sortingPacksMethods.ascCardsCount]: 'cards count',
    [sortingPacksMethods.desCardsCount]: 'cards count',
    [sortingPacksMethods.ascUpdate]: 'latest update',
    [sortingPacksMethods.desUpdate]: 'latest update',
    [sortingPacksMethods.ascUserName]: 'creator name',
    [sortingPacksMethods.desUserName]: 'creator name',
  }

  if (obj[value]) return obj[value]
}
