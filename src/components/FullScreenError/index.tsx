'use client'

import React, { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

interface FullScreenErrorProps {
  error: ShowError
}

function FullScreenError({ error }: FullScreenErrorProps) {
  const t = useTranslations()
  const message = useMemo(() => getError(error, false), [error])
  return (
    <div className='m-auto w-full rounded-lg p-8 text-center shadow-lg'>
      <h2 className='mb-4 text-3xl font-semibold text-red-600'>
        {t('shared.error')}!
      </h2>
      <p className='mb-6 text-lg text-neutral-700'>{message}</p>
    </div>
  )
}

export default FullScreenError
