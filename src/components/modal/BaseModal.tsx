import React, { useEffect } from 'react'

import { createPortal } from 'react-dom'

import { modalSelector } from 'app/appSelectors'
import { setModal } from 'app/appSlice'
import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { calcScrollWidth } from 'common/utils/calcScrollWidth'
import { AddCardModal } from 'components/modal/add-new-card-modal/AddCardModal'
import { AddNewPackModal } from 'components/modal/add-new-pack-modal/AddNewPackModal'
import s from 'components/modal/BaseModal.module.scss'
import { DeleteCardModal } from 'components/modal/delete-card-modal/DeleteCardModal'
import { DeletePackModal } from 'components/modal/delete-pack-modal/DeletePackModal'
import { EditCardModal } from 'components/modal/edit-card-modal/EditCardModal'
import { EditPackNameModal } from 'components/modal/edit-pack-modal/EditPackNameModal'
import { Box } from 'UI/box/Box'

export const BaseModal = () => {
  const { open, type } = useTypedSelector(modalSelector)
  const root = document.querySelector<HTMLElement>('#root')
  const dispatch = useTypedDispatch()
  const scroll = calcScrollWidth()
  const closeModalOnEscape = (e: KeyboardEvent) => {
    e.key === 'Escape' && closeModal()
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keyup', closeModalOnEscape)
      if (root) {
        root.append(scroll)
        root.style.filter = 'blur(1.5px)'
      }
    } else {
      document.querySelector(`#scrollId`)?.remove()

      document.body.style.overflow = ''
      if (root) root.style.filter = ''
    }

    return () => document.removeEventListener('keyup', closeModalOnEscape)
  }, [open])

  const closeModal = () => {
    dispatch(setModal({ type: '', open: false }))
  }

  return createPortal(
    open && (
      <div className={s.modal}>
        <div className={s.background} onClick={closeModal}></div>

        <div className={s.container}>
          <Box size="M">
            <div className={s.header}>
              <Close className={s.close} onClick={closeModal} />
              <h2 className={s.title}>{type}</h2>
            </div>

            {type === 'Add new pack' && <AddNewPackModal />}
            {type === 'Edit pack name' && <EditPackNameModal />}
            {type === 'Delete Pack' && <DeletePackModal />}

            {type === 'Add new card' && <AddCardModal />}
            {type === 'Edit card name' && <EditCardModal />}
            {type === 'Delete Card' && <DeleteCardModal />}
          </Box>
        </div>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
