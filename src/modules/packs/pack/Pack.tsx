import React, { FC } from 'react'

import { ResponsePackType } from 'modules/packs/packsApi'
type PackType = {
  name: string
}
export const Pack: FC<PackType> = ({ name }) => {
  return <div>{name}</div>
}
