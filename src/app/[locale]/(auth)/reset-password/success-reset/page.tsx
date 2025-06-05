import React from 'react'
import { navigationLinks } from '@constants'
import Success from '@sections/Auth/Success'
import { useTranslations } from 'next-intl'

function SuccessReset() {
  const t = useTranslations()
  return (
    <Success
      href={navigationLinks.auth.signIn}
      title={t('auth.successReset.title')}
      buttonTitle={t('auth.successReset.buttonTitle')}
      description={t('auth.successReset.description')}
    />
  )
}

export default SuccessReset
