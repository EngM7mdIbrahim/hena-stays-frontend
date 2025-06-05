'use client'

import React from 'react'
import { Box, Text, TextInput, TextInputProps } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

export interface FormInputProps {
  required?: boolean
  label?: string
  showOptional?: boolean
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | string | Location
  ) => void
}

export interface TextFieldProps extends FormInputProps {
  placeholder?: string
  type?: string
}

function TextField({
  required,
  showOptional = true,
  label,
  value = '',
  onChange,
  placeholder,

  type = 'text',
  ...rest
}: TextFieldProps & TextInputProps) {
  const t = useTranslations()
  return (
    <Box className={cn('w-full font-lexend')}>
      <TextInput
        {...rest}
        classNames={{
          root: '!p-0',
          input: cn(
            'w-full rounded-md mt-2 border bg-default-background border-neutral-400 px-3 py-2 focus:border-neutral-300 focus:outline-none',
            rest.className
          )
        }}
        bd='none'
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        label={
          <label>
            <Text
              component='span'
              className='text-sm font-bold text-neutral-500'
            >
              {label} {!required && showOptional && `(${t('shared.optional')})`}
            </Text>
          </label>
        }
        withErrorStyles={false}
      />
    </Box>
  )
}

export default TextField
