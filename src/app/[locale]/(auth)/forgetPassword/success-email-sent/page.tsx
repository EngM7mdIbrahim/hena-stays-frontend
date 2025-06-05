import React from 'react'
import PasswordResetEmailSent from '@sections/Auth/ForgetPassword/PasswordResetEmailSent'

export interface SuccessEmailSentProps {
  searchParams: { msg: string }
}

function SuccessEmailSent({ searchParams }: SuccessEmailSentProps) {
  return <PasswordResetEmailSent msg={searchParams.msg} />
}

export default SuccessEmailSent
