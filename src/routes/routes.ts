export const PATH = {
  MAIN: '/',
  LOG_IN: '/login',
  PROFILE: '/profile',
  LOG_UP: '/log-up',
  NOT_FOUND: '/*',
  PASS_RECOVERY: '/password',
  SET_NEW_PASS: '/set-new-password/:token',
  CHECK_EMAIL: '/checkEmail',
  PACKS: '/packs',
  ERROR_404: '/404',
  CARDS: '/cards/:id',
  CARD: '/cards/:id/learn',
} as const
