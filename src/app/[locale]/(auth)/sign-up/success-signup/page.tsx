'use client'

import React, { useMemo } from 'react'
import { LOCAL_STORAGE_KEYS, navigationLinks } from '@constants'
import Success from '@sections/Auth/Success'
import { useTranslations } from 'next-intl'

function SuccessSignUp() {
  const t = useTranslations()
  const url = useMemo(() => {
    const savedUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.REDIRECT_URL)
    if (savedUrl) {
      return decodeURIComponent(savedUrl)
    }
    return navigationLinks.landingPage
  }, [])

  return (
    <Success
      href={url}
      title={t('auth.signup.successSignup.title')}
      buttonTitle={
        url === navigationLinks.landingPage
          ? t('auth.signup.successSignup.buttonTitle.landingPage')
          : t('auth.signup.successSignup.buttonTitle.other')
      }
      description={t('auth.signup.successSignup.description')}
    />
  )
}

export default SuccessSignUp
