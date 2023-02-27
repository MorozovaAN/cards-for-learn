import React, { KeyboardEvent, useState } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import s from 'components/modal/add-new-pack-modal/AddNewPackModal.module.scss'
import { useAddPackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const AddNewPackModal = () => {
  const [addPack, { isLoading }] = useAddPackMutation()
  const [name, setName] = useState('')
  const [privatePack, setPrivatePack] = useState(false)
  const dispatch = useTypedDispatch()
  const error = name.length > 50

  const addPackHandler = async () => {
    await addPack({ cardsPack: { name: name, deckCover: '', private: privatePack } }).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && name && !error && addPackHandler()
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
        placeholder="Please, write name of the new pack"
        disabled={isLoading}
        error={error && 'Sorry, max pack name length 50 symbols or less'}
      />

      <div className={s.checkbox}>
        <Checkbox onChange={() => setPrivatePack(!privatePack)} disabled={isLoading}>
          Private pack
        </Checkbox>
      </div>

      <Button
        styleType="primary"
        disabled={!name || isLoading || error}
        className={s.button}
        onClick={addPackHandler}
      >
        Save
      </Button>
    </>
  )
}
