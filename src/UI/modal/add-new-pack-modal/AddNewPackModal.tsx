import React, { useState } from 'react'

import s from './AddNewPackModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useAddPackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const AddNewPackModal = () => {
  const [addPack] = useAddPackMutation()
  const [name, setName] = useState<string>('')
  const [privatePack, setPrivatePack] = useState(false)
  const dispatch = useTypedDispatch()

  const addPackHandler = async () => {
    await addPack({ cardsPack: { name: name, deckCover: '', private: privatePack } }).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  return (
    <>
      <Input
        autoFocus
        value={name}
        onChange={e => setName(e.currentTarget.value)}
        type="text"
        label="Name of the new pack"
        placeholder="write name of the new pack"
      />

      <div className={s.checkbox}>
        <Checkbox onChange={() => setPrivatePack(!privatePack)}>Private pack</Checkbox>
      </div>

      <Button styleType="primary" disabled={!name} className={s.button} onClick={addPackHandler}>
        Save
      </Button>
    </>
  )
}
