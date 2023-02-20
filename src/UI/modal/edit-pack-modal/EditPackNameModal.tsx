import React, { KeyboardEvent, useState } from 'react'

import s from './EditPackNameModal.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useUpdatePackMutation } from 'modules/packs/packsApi'
import { packIdSelector, packNameSelector } from 'modules/packs/packsSelectors'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const EditPackNameModal = () => {
  const [updatePackName, { isLoading }] = useUpdatePackMutation()
  const packName = useTypedSelector(packNameSelector)
  const packId = useTypedSelector(packIdSelector)
  const [newName, setNewName] = useState(packName)
  const [privatePack, setPrivatePack] = useState(false)
  const dispatch = useTypedDispatch()

  const editPackNameHandler = async () => {
    await updatePackName({
      cardsPack: { _id: packId, name: newName, private: privatePack },
    }).unwrap()
    dispatch(setModal({ open: false, type: '' }))
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && newName && editPackNameHandler()
  }

  return (
    <>
      <Input
        autoFocus
        value={newName}
        onChange={e => setNewName(e.currentTarget.value)}
        onKeyUp={onEnterHandler}
        type="text"
        label="New pack name"
        error={!newName.length && 'Write new name of the pack'}
        disabled={isLoading}
      />

      <div className={s.checkbox}>
        <Checkbox onChange={() => setPrivatePack(!privatePack)} disabled={isLoading}>
          Private pack
        </Checkbox>
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
