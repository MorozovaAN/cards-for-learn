import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import clsx from 'clsx'

import s from './Skeletons.module.scss'

import { skeletonsSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'

type SkeletonsType = {
  components: 'packs' | 'cards' | 'packButtons' | 'cardButtons'
  count?: number[]
}
export const Skeletons: FC<SkeletonsType> = ({ components, count }) => {
  const skeletons = useTypedSelector(skeletonsSelector)
  const skeletonsCount = count ?? skeletons

  const skeletonContainer = clsx({
    [s.skeletonPackContainer]: components === 'packs',
    [s.skeletonCardsContainer]: components === 'cards',
    [s.skeletonPackButtonsContainer]: components === 'packButtons',
    [s.skeletonCardButtonsContainer]: components === 'cardButtons',
  })

  const skeleton = clsx({
    [s.skeletonPack]: components === 'packs',
    [s.skeletonCard]: components === 'cards',
    [s.skeletonPackButtons]: components === 'packButtons',
    [s.skeletonCardButtons]: components === 'cardButtons',
  })

  return (
    <>
      {skeletonsCount.map(el => (
        <div className={skeletonContainer} key={el}>
          <Skeleton classes={{ root: skeleton }} animation="wave" variant="rectangular" />
        </div>
      ))}
    </>
  )
}
