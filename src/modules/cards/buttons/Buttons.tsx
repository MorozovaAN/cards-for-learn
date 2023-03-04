import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { Link } from 'react-router-dom'

import s from './Buttons.module.scss'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as EditIcon } from 'assets/img/icons/edit.svg'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { ReactComponent as PlusIcon } from 'assets/img/icons/plus.svg'
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { idSelector } from 'modules/auth/authSelectors'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'

type ButtonsType = {
  packId: string
  packName: string
  isFetching: boolean
  disabled: boolean
  privatePack: boolean
  cardsCount: number
}

export const Buttons: FC<ButtonsType> = ({
  packId,
  packName,
  privatePack,
  isFetching,
  disabled,
  cardsCount,
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const myId = useTypedSelector(idSelector)
  const myCards = searchParams.get('user_id') === myId
  const skeletons = [1, 2, 3, 4]

  const openModalHandler = (type: ModalType) => {
    dispatch(setPackInfo({ packId, packName, privatePack }))
    dispatch(setModal({ open: true, type }))
  }

  const learnUrl = `/learn?pageCount=${cardsCount}&cardsPack_id=${packId}`

  const myCardsList = isFetching ? (
    skeletons.map(el => (
      <div className={s.skeletonMyCardsContainer} key={el}>
        <Skeleton classes={{ root: s.skeletonMyCards }} animation="wave" variant="rectangular" />
      </div>
    ))
  ) : (
    <>
      <Button
        styleType="secondary"
        className={s.myPackBtn}
        disabled={disabled}
        onClick={() => openModalHandler('Add new card')}
      >
        <PlusIcon width="20" height="20" />
      </Button>

      <Link to={learnUrl} className={s.myPackBtn}>
        <LearnIcon className={s.learnIcon} stroke="#017c6e" />
      </Link>

      <Button
        styleType="secondary"
        className={s.myPackBtn}
        disabled={disabled}
        onClick={() => openModalHandler('Edit pack name')}
      >
        <EditIcon width="18" fill="#017c6e" />
      </Button>

      <Button
        styleType="secondary"
        className={s.myPackBtn}
        disabled={disabled}
        onClick={() => openModalHandler('Delete Pack')}
      >
        <TrashIcon width="18" height="20" fill="#017c6e" />
      </Button>
    </>
  )

  const otherCardsList = isFetching ? (
    <div className={s.skeletonOtherCardsContainer}>
      <Skeleton classes={{ root: s.skeletonOtherCards }} animation="wave" variant="rectangular" />
    </div>
  ) : (
    <Link to={learnUrl} className={s.learnPackBtn}>
      <p>Learn pack</p>
      <LearnIcon className={s.learnIcon} stroke="#017c6e" />
    </Link>
  )

  return (
    <> {myCards ? <div className={s.buttonsContainer}> {myCardsList} </div> : otherCardsList}</>
  )
}
