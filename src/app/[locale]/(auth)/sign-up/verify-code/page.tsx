'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useSendOTP, useUser, useVerifyOTP } from '@hooks'
import OTP from '@sections/Auth/Signin/OTP'

import { ShowError } from '@interfaces'
import { appNotifications, getError } from '@utils'

export interface VerifyCodeProps {
  searchParams: { email: string }
}

function VerifyCode({ searchParams }: VerifyCodeProps) {
  const router = useRouter()
  const { email } = searchParams
  const { login, user } = useUser()

  useEffect(() => {
    if (!email) {
      router.push(navigationLinks.auth.signUp)
    }
  }, [email])

  const [code, setCode] = useState('')

  const verifyOTP = useVerifyOTP()

  const handleConfirm = async () => {
    try {
      const response = await verifyOTP.mutateAsync({ email, otp: code })
      login(response.token, user as User)
      appNotifications.success(response.msg)
      router.push(navigationLinks.auth.successSignUp)
    } catch (error) {
      getError(error as ShowError)
    }
  }

  const sendOTP = useSendOTP()

  const onResend = async () => {
    try {
      const response = await sendOTP.mutateAsync({
        email
      })
      appNotifications.success(response.msg)
    } catch (error) {
      getError(error as ShowError)
    }
  }

  return (
    <OTP
      code={code}
      setCode={setCode}
      isSuccess={!verifyOTP.isPending && !verifyOTP.isError}
      isLoading={verifyOTP.isPending}
      onConfirm={handleConfirm}
      onResend={onResend}
      errorMessage={(verifyOTP?.error as ShowError)?.response?.data?.msg ?? ''}
      email={email}
    />
  )
}

export default VerifyCode
