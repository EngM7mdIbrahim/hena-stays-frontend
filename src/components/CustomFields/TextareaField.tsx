'use client'

import React from 'react'
import { Box, Text, Textarea, TextareaProps } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

export interface FormInputProps {
  required?: boolean
  label?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string | Location) => void
}

export interface TextFieldProps extends FormInputProps {
  placeholder: string
  type: string
}

function TextareaField({
  required,
  label,
  value = '',
  onChange,
  placeholder,
  ...rest
}: TextareaProps) {
  const t = useTranslations()
  return (
    <Box className={cn('w-full font-lexend')}>
      <Textarea
        {...rest}
        classNames={{
          root: '!p-0',
          input: cn(
            'w-full rounded-md mt-2 border bg-default-background border-neutral-400 px-3 py-2 focus:border-neutral-300 focus:outline-none',
            rest.className
          )
        }}
        bd='none'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        label={
          label && (
            <label>
              <Text
                component='span'
                className='text-sm font-bold text-neutral-500'
              >
                {label} {!required && ` (${t('shared.optional')})`}
              </Text>
            </label>
          )
        }
        withErrorStyles={false}
      />
    </Box>
  )
}

export default TextareaField
