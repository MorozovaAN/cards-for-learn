import React, { KeyboardEvent, useState } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'components/modal/edit-pack-modal/EditPackNameModal.module.scss'
import { useUpdatePackMutation } from 'modules/packs/packsApi'
import {
  packIdSelector,
  packNameSelector,
  privateCheckboxSelector,
} from 'modules/packs/packsSelectors'
import { setPackInfo } from 'modules/packs/packsSlise'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const EditPackNameModal = () => {
  const [updatePackName, { isLoading }] = useUpdatePackMutation()
  const dispatch = useTypedDispatch()
  const packName = useTypedSelector(packNameSelector)
  const packId = useTypedSelector(packIdSelector)
  const privateCheckbox = useTypedSelector(privateCheckboxSelector)
  const [newName, setNewName] = useState(packName)
  const [privatePack, setPrivatePack] = useState(privateCheckbox)
  const error = newName.trim().length > 50

  const editPackNameHandler = async () => {
    await updatePackName({
      cardsPack: { _id: packId, name: newName.trim(), private: privatePack },
    }).unwrap()
    dispatch(setModal({ open: false, type: '' }))
    dispatch(
      setPackInfo({ packId: packId, packName: newName.trim(), privatePack: privateCheckbox })
    )
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && !error && newName && editPackNameHandler()
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
        error={
          (!newName.length && 'Please, write new name of the pack') ||
          (error && 'Sorry, max pack name length 50 symbols or less')
        }
        disabled={isLoading}
      />

      <div className={s.checkbox}>
        <Checkbox
          checked={privatePack}
          onChange={() => setPrivatePack(!privatePack)}
          disabled={isLoading}
        >
          Private pack
        </Checkbox>
      </div>

      <Button
        styleType="primary"
        disabled={!newName.trim().length || isLoading || error}
        className={s.button}
        onClick={editPackNameHandler}
      >
        Save
      </Button>
    </>
  )
}
