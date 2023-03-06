import React from 'react'

import { SetNewPassword } from 'modules'
import { AnimationWrapper } from 'UI/animation-wrapper/AnimationWrapper'

export const NewPasswordPage = () => {
  return (
    <AnimationWrapper>
      <SetNewPassword />
    </AnimationWrapper>
  )
}
