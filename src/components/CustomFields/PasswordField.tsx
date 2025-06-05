'use client'

import React from 'react'
import { PasswordInput, PasswordInputProps, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

function PasswordField({
  label,
  placeholder,
  onChange,
  value,
  required,
  error,
  ...rest
}: PasswordInputProps) {
  const t = useTranslations()
  return (
    <PasswordInput
      bd='none'
      classNames={{
        input: cn(
          'w-full rounded-md mt-2 border bg-default-background border-neutral-400 focus:border-neutral-300 focus:outline-none',
          rest.className
        ),
        innerInput: 'px-3 text-md'
      }}
      label={
        <label>
          <Text component='span' className='text-sm font-bold text-neutral-500'>
            {label} {!required && ` (${t('shared.optional')})`}
          </Text>
        </label>
      }
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...rest}
      required={required}
      error={error}
    />
  )
}

export default PasswordField
