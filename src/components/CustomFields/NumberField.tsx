'use client'

import React from 'react'
import { NumberInput, NumberInputProps, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

function NumberField({
  label,
  placeholder,
  required,
  showOptional = true,
  format = true,
  ...rest
}: NumberInputProps & { format?: boolean; showOptional?: boolean }) {
  const t = useTranslations()
  return (
    <NumberInput
      min={0}
      required={required}
      {...rest}
      classNames={{
        root: '!p-0',
        input: cn(
          'w-full rounded-md bg-default-background mt-2 border border-neutral-400 px-3 py-2 focus:border-neutral-300 focus:outline-none',
          rest.className
        )
      }}
      label={
        <label>
          <Text
            component='span'
            className='whitespace-nowrap text-sm font-bold text-neutral-500'
          >
            {label} {!required && showOptional && ` (${t('shared.optional')})`}
          </Text>
        </label>
      }
      placeholder={placeholder}
      thousandSeparator={format ? ',' : ''}
    />
  )
}

export default NumberField
