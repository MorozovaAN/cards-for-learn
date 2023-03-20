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
  skeletonsNumbers: [1, 2, 3, 4, 5, 6],
  burger: false,
  windowWidth: 0,
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
    setSkeletonsNumbers: (state, action: PayloadAction<string>) => {
      let value

      switch (action.payload) {
        case '9':
          value = [1, 2, 3, 4, 5, 6, 7, 8, 9]
          break
        case '12':
          value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          break
        case '15':
          value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
          break
        default:
          value = [1, 2, 3, 4, 5, 6]
      }
      state.skeletonsNumbers = value
    },
    setBurger: (state, action: PayloadAction<boolean>) => {
      state.burger = action.payload
    },
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload
    },
  },
})

type NotificationType = '' | 'error' | 'success'
export type ModalType =
  | ''
  | 'Add new pack'
  | 'Edit pack name'
  | 'Delete Pack'
  | 'Add new card'
  | 'Edit card'
  | 'Delete Card'

export const {
  setIsAuth,
  setIsLoggedIn,
  setNotification,
  setIsLoading,
  setModal,
  setSkeletonsNumbers,
  setBurger,
  setWindowWidth,
} = appSlice.actions
export const appReducer = appSlice.reducer
