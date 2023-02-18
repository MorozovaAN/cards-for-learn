import React, { FC, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'modules/packs/modals/add-pack-modal/AddPackModal.module.scss'
import { useUpdatePackMutation } from 'modules/packs/packsApi'
import { setShowEditNamePackModal } from 'modules/packs/packsSlise'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

type UpdatePackProps = {
  packId: string
  name: string
}
export const EditPackName: FC<UpdatePackProps> = ({ packId, name }) => {
  const [updatePackName] = useUpdatePackMutation()
  const [newName, setNewName] = useState('')
  const [privatePack, setPrivatePack] = useState(false)
  const showModal = useTypedSelector(state => state.packs.showEditNamePackModal)
  const currentName = useTypedSelector(state => state.packs.currentPackName)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    setNewName(currentName)
  }, [currentName])

  const editPackNameHandler = () => {
    updatePackName({ cardsPack: { _id: packId, name: newName, private: privatePack } })
  }

  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [showModal])

  const closeModal = () => {
    dispatch(setShowEditNamePackModal(false))
  }

  return createPortal(
    showModal && (
      <div className={s.modal}>
        <div className={s.background} onClick={closeModal}></div>

        <Box size="M" className={s.box}>
          <div className={s.header}>
            <Close className={s.close} onClick={closeModal} />
            <h2 className={s.title}>Add new pack</h2>
          </div>

          <Input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.currentTarget.value)}
            type="text"
            label="New pack name"
            error={!newName.length && 'Write new name of the pack'}
          />

          <div>
            Private pack
            <Checkbox checked={privatePack} onChange={() => setPrivatePack(!privatePack)} />
          </div>

          <Button styleType="primary" disabled={!newName} onClick={editPackNameHandler}>
            Save
          </Button>
        </Box>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
