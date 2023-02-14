import React, { FC, useState } from 'react'

import { useUpdatePackMutation } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'

type UpdatePackProps = {
  packId: string
  name: string
}
export const UpdatePackName: FC<UpdatePackProps> = ({ packId, name }) => {
  const [nameValue, setNameValue] = useState<string>(name)
  const [updatePackName] = useUpdatePackMutation()

  const handleUpdatePack = () => {
    updatePackName({ cardsPack: { _id: packId, name: nameValue } })
  }

  return (
    <>
      <Input
        autoFocus
        value={nameValue}
        onChange={e => setNameValue(e.currentTarget.value)}
        type="text"
        label="Name pack"
        error={!nameValue.length ? 'write name other-pack' : ''}
      />
      <div>
        <Checkbox />
      </div>
      <Button styleType="primary" disabled={!nameValue} onClick={handleUpdatePack}>
        Save
      </Button>
    </>
  )
}
