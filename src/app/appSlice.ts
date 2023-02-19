import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  isLoggedIn: false,
  isLoading: false,
  notification: {
    message: '',
    type: '' as NotificationType,
    open: false,
  },
  modal: {
    type: '' as ModalType,
    open: false,
  },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuth: state => {
      state.isAuth = true
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setNotification: (
      state,
      action: PayloadAction<{ message: string; type: NotificationType }>
    ) => {
      state.notification.message = action.payload.message
      state.notification.type = action.payload.type
    },
    setModal: (state, action: PayloadAction<{ type: ModalType; open: boolean }>) => {
      state.modal.open = action.payload.open
      state.modal.type = action.payload.type
    },
  },
})

type NotificationType = '' | 'error' | 'success'
type ModalType = '' | 'Add new pack' | 'Edit pack name' | 'Delete Pack'

export const { setIsAuth, setIsLoggedIn, setNotification, setIsLoading, setModal } =
  appSlice.actions
export const appReducer = appSlice.reducer
