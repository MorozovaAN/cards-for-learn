export const isAppSecondaryClass = (location: string): boolean => {
  switch (location) {
    case '/log-in/':
      return true
    case '/log-up/':
      return true
    case '/password/':
      return true
    case '/set-new-password/:token':
      return true
    case '/check-email/':
      return true
    case '/profile/':
      return true
    case '/learn/':
      return true
    default:
      return false
  }
}
