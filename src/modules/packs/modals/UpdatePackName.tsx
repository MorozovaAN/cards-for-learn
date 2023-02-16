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
  const [updatePackName] = useUpdatePackMutation()
  const [nameValue, setNameValue] = useState<string>(name)
  const [checked, setChecked] = useState<boolean>(false)

  const handleUpdatePack = () => {
    updatePackName({ cardsPack: { _id: packId, name: nameValue, private: checked } })
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
        Private pack
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      </div>
      <Button styleType="primary" disabled={!nameValue} onClick={handleUpdatePack}>
        Save
      </Button>
    </>
  )
}
