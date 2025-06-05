'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Box } from '@mantine/core'
import Success from '@sections/Auth/Success'
import { useTranslations } from 'next-intl'

function SuccessBuyPropertyRequest() {
  const t = useTranslations('buyPropertyRequests.makeACallForm.success')
  return (
    <Box className='m-auto flex h-screen max-w-5xl flex-col items-center justify-center'>
      <Success
        href={navigationLinks.landingPage}
        title={t('title')}
        src={navigationLinks.assets.generalSuccess}
        buttonTitle={t('buttonTitle')}
        description={t('description')}
      />
    </Box>
  )
}

export default SuccessBuyPropertyRequest
