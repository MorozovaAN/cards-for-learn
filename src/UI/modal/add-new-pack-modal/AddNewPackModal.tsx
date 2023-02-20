import React, { KeyboardEvent, useState } from 'react'

import s from './AddNewPackModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useAddPackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const AddNewPackModal = () => {
  const [addPack, { isLoading }] = useAddPackMutation()
  const [name, setName] = useState<string>('')
  const [privatePack, setPrivatePack] = useState(false)
  const dispatch = useTypedDispatch()

  const addPackHandler = async () => {
    await addPack({ cardsPack: { name: name, deckCover: '', private: privatePack } }).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && name && addPackHandler()
  }

  return (
    <>
      <Input
        autoFocus
        value={name}
        onChange={e => setName(e.currentTarget.value)}
        onKeyUp={onEnterHandler}
        type="text"
        label="Name of the new pack"
        placeholder="write name of the new pack"
        disabled={isLoading}
      />

      <div className={s.checkbox}>
        <Checkbox onChange={() => setPrivatePack(!privatePack)} disabled={isLoading}>
          Private pack
        </Checkbox>
      </div>

      <Button
        styleType="primary"
        disabled={!name || isLoading}
        className={s.button}
        onClick={addPackHandler}
      >
        Save
      </Button>
    </>
  )
}
