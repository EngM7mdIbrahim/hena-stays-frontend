'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { isDark } from '@guards'
import {
  Box,
  Skeleton,
  Stack,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

import { FormInputProps } from './TextField'

export interface PhoneNumberFieldProps extends Omit<FormInputProps, 'type'> {
  className?: string
}

const MuiTelInput = dynamic(
  () => import('mui-tel-input').then((mod) => mod.MuiTelInput),
  {
    ssr: false,
    loading: () => <Skeleton className='h-12 w-full' />
  }
)

function PhoneNumberField({
  value,
  onChange,
  required,
  className,
  label
}: PhoneNumberFieldProps) {
  const { colorScheme } = useMantineColorScheme()
  const t = useTranslations()
  return (
    <Stack className={cn('flex w-full flex-col gap-2 font-lexend', className)}>
      <Box className='text-sm font-bold text-neutral-500'>
        {required ? (
          <Box>
            <Text component='span' className='text-sm font-bold'>
              {label}
            </Text>{' '}
            <Text component='span' className='text-error-500'>
              *
            </Text>
          </Box>
        ) : (
          <>
            {label} {!required && ` (${t('shared.optional')})`}
          </>
        )}
      </Box>

      <MuiTelInput
        className='rounded-md'
        value={value}
        onChange={onChange}
        defaultCountry='AE'
        sx={{
          '& .MuiInputBase-root': {
            'backgroundColor': isDark(colorScheme) ? '#0D0D0D' : '#ffffff',
            'height': '40px',
            'py': '8px',
            'pl': '12px',
            'm': '0px',
            'color': isDark(colorScheme) ? '#D9D9D9' : '#696969',
            '& fieldset': {
              borderColor: isDark(colorScheme) ? '#5A6472' : '#9CA3AF',
              borderRadius: '5px'
            },
            '&:hover fieldset': {
              borderColor: isDark(colorScheme) ? '#6b7280' : '#9ca3af'
            },
            '&.Mui-focused fieldset': {
              borderColor: isDark(colorScheme) ? '#34383E' : '#D1D5DB',
              borderWidth: '1px'
            }
          },
          '& .MuiInputBase-input': {
            height: '17px'
          }
        }}
        required
      />
    </Stack>
  )
}

export default PhoneNumberField
