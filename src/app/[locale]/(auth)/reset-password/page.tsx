import React from 'react'
import ResetPassword from '@sections/Auth/ResetPassword/ResetPassword'

export interface ResetPasswordPageProps {
  searchParams: {
    token: string
  }
}

function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  return <ResetPassword token={searchParams.token} />
}

export default ResetPasswordPage
