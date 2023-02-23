export const isPrivatePage = (location: string): boolean => {
  switch (location) {
    case '/log-in':
      return false
    case '/log-up':
      return false
    case '/password':
      return false
    case '/set-new-password/:token':
      return false
    case '/check-email':
      return false
    case '/404':
      return false
    default:
      return true
  }
}
