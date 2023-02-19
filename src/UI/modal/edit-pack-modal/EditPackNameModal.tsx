import React, { useState } from 'react'

import s from './EditPackNameModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useUpdatePackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const EditPackNameModal = () => {
  const [updatePackName, { isLoading }] = useUpdatePackMutation()
  const [newName, setNewName] = useState('')
  const [privatePack, setPrivatePack] = useState(false)
  const dispatch = useTypedDispatch()

  const editPackNameHandler = async () => {
    dispatch(setModal({ open: false, type: '' }))
    updatePackName({
      cardsPack: { _id: 'packId', name: newName, private: privatePack },
    }).unwrap()
  }

  return (
    <>
      <Input
        autoFocus
        value={newName}
        onChange={e => setNewName(e.currentTarget.value)}
        type="text"
        label="New pack name"
        //error={!newName.length && 'Write new name of the pack'}
      />

      <div className={s.checkbox}>
        <Checkbox onChange={() => setPrivatePack(!privatePack)}>Private pack</Checkbox>
      </div>

      <Button
        styleType="primary"
        disabled={!newName || isLoading}
        className={s.button}
        onClick={editPackNameHandler}
      >
        Save
      </Button>
    </>
  )
}