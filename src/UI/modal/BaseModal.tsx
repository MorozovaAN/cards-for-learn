import React, { useEffect } from 'react'

import { createPortal } from 'react-dom'

import s from './BaseModal.module.scss'
import { DeletePackModal } from './delete-pack-modal/DeletePackModal'

import { modalSelector } from 'app/appSelectors'
import { setModal } from 'app/appSlice'
import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { calcScrollWidth } from 'common/utils/calcScrollWidth'
import { Box } from 'UI/box/Box'
import { AddNewPackModal } from 'UI/modal/add-new-pack-modal/AddNewPackModal'
import { EditPackNameModal } from 'UI/modal/edit-pack-modal/EditPackNameModal'

export const BaseModal = () => {
  const { open, type } = useTypedSelector(modalSelector)
  const root = document.querySelector<HTMLElement>('#root')
  const dispatch = useTypedDispatch()
  const scroll = calcScrollWidth()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      if (root) {
        root.append(scroll)
        root.style.filter = 'blur(1.5px)'
      }
    } else {
      document.querySelector(`#scrollId`)?.remove()

      document.body.style.overflow = ''
      if (root) root.style.filter = ''
    }
  }, [open])

  const closeModal = () => {
    dispatch(setModal({ type: '', open: false }))
  }

  return createPortal(
    open && (
      <div className={s.modal}>
        <div className={s.background} onClick={closeModal}></div>

        <Box size="M" className={s.box}>
          <div className={s.header}>
            <Close className={s.close} onClick={closeModal} />
            <h2 className={s.title}>{type}</h2>
          </div>

          {type === 'Add new pack' && <AddNewPackModal />}
          {type === 'Edit pack name' && <EditPackNameModal />}
          {type === 'Delete Pack' && <DeletePackModal />}
        </Box>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
