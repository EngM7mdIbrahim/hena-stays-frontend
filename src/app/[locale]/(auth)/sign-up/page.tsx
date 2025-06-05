import React from 'react'
import { isUserRole } from '@guards'
import SignUp from '@sections/Auth/SignUp/SignUp'

export interface SignupPageProps {
  searchParams: { type: string; user: string }
}

function SignUpPage({ searchParams }: SignupPageProps) {
  const { type } = searchParams

  return <SignUp type={isUserRole(type) ? type : undefined} />
}

export default SignUpPage
