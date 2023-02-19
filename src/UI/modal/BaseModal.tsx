import React from 'react'

import { createPortal } from 'react-dom'

import s from './BaseModal.module.scss'

import { setModal } from 'app/appSlice'
import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Box } from 'UI/box/Box'
import { AddNewPackModal } from 'UI/modal/add-new-pack-modal/AddNewPackModal'
import { EditPackNameModal } from 'UI/modal/edit-pack-modal/EditPackNameModal'

export const BaseModal = () => {
  const open = useTypedSelector(state => state.app.modal.open)
  const type = useTypedSelector(state => state.app.modal.type)
  const dispatch = useTypedDispatch()

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
        </Box>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
