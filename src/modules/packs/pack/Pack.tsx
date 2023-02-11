import React, { FC } from 'react'

import { ResponsePackType } from 'modules/packs/packsApi'
type PackType = {
  pack: ResponsePackType
}
export const Pack: FC<PackType> = ({ pack: { name } }) => {
  return <div>{name}</div>
}
