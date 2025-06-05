'use client'

import React from 'react'
import { MultiSelect, MultiSelectProps, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

function MultiSelectField({
  label,
  required,
  showOptional = true,
  ...props
}: MultiSelectProps & { showOptional?: boolean }) {
  const t = useTranslations()
  return (
    <MultiSelect
      classNames={{
        input: cn(
          'w-full rounded-md mt-2 border border-neutral-400 bg-default-background focus:border-neutral-300 focus:outline-none',
          props.className
        )
      }}
      required={required}
      {...props}
      label={
        label && (
          <label>
            <Text
              component='span'
              className='text-sm font-bold text-neutral-500'
            >
              {label}{' '}
              {!required && showOptional && ` (${t('shared.optional')})`}
            </Text>
          </label>
        )
      }
    />
  )
}

export default MultiSelectField
