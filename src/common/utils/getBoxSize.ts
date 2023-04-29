import { ModalType } from '../../app/appSlice'

export const getBoxSize = (type: ModalType) => {
  if (type === 'Add new pack' || type === 'Edit pack name' || type === 'Delete Pack') return 'M'

  return 'L'
}
