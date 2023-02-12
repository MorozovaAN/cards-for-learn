import React, { useState } from 'react'

import { baseQueryParams } from 'common/constants/baseQueryParams'
import { formatDate } from 'common/utils/formatDate'
import { Pack } from 'modules/packs/pack/Pack'
import { useAddPackMutation, useGetPacksQuery } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const AddPackModal = () => {
  const [newPack, setNewPack] = useState<string>('')
  const [addPack] = useAddPackMutation()
  const { data: packs } = useGetPacksQuery(baseQueryParams)

  const handleAddPack = async () => {
    await addPack({ cardsPack: { name: newPack, deckCover: '', private: false } }).unwrap()
    setNewPack('')
  }

  return (
    <>
      <Input
        value={newPack}
        onChange={e => setNewPack(e.currentTarget.value)}
        type="text"
        label="Name pack"
        autoFocus
        // className={!name.length ? s.inputError : s.input}
        // error={!name.length ? 'write name pack' : ''}
      />
      <div>
        <Checkbox />
      </div>
      <Button styleType="primary" onClick={handleAddPack}>
        Save
      </Button>
    </>
  )
}
