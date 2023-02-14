import React, { useState } from 'react'

import { useAddPackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

export const AddPackModal = () => {
  const [newPack, setNewPack] = useState<string>('')
  const [addPack] = useAddPackMutation()

  const handleAddPack = async () => {
    await addPack({ cardsPack: { name: newPack, deckCover: '', private: false } }).unwrap()
  }

  return (
    <>
      <Input
        value={newPack}
        onChange={e => setNewPack(e.currentTarget.value)}
        type="text"
        label="Name pack"
        autoFocus
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
