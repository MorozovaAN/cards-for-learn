import React, { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import s from './AddPackModal.module.scss'

import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useAddPackMutation } from 'modules/packs/packsApi'
import { setShowAddPackModal } from 'modules/packs/packsSlise'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const AddPackModal = () => {
  const [name, setName] = useState<string>('')
  const [privatePack, setPrivatePack] = useState<boolean>(false)
  const showModal = useTypedSelector(state => state.packs.showAddPackModal)
  const [addPack] = useAddPackMutation()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [showModal])

  const handleAddPack = async () => {
    await addPack({ cardsPack: { name, deckCover: '', private: privatePack } }).unwrap()
    dispatch(setShowAddPackModal(false))
  }

  const closeModal = () => {
    dispatch(setShowAddPackModal(false))
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
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            type="text"
            label="Name pack"
            autoFocus
          />

          <div className={s.checkbox}>
            <Checkbox onChange={() => setPrivatePack(!privatePack)}>
              <p className={s.subtitle}>Private pack</p>
            </Checkbox>
          </div>

          <Button styleType="primary" onClick={handleAddPack} className={s.button} disabled={!name}>
            Save
          </Button>
        </Box>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
