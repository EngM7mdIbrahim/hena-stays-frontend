'use client'

import React from 'react'
import { Text } from '@mantine/core'
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates'
import { BsCalendar2Date } from 'react-icons/bs'

import '@mantine/dates/styles.css'

import { useTranslations } from 'next-intl'

function DateField({
  label,
  placeholder,
  required,
  ...props
}: DatePickerInputProps<'default'>) {
  const t = useTranslations()

  return (
    <DatePickerInput<'default'>
      rightSection={<BsCalendar2Date size={20} />}
      required={required}
      {...props}
      classNames={{
        input:
          'w-full rounded-md mt-2 border bg-default-background border-neutral-400 focus:border-neutral-300 focus:outline-none'
      }}
      label={
        <label>
          <Text component='span' className='text-sm font-bold text-neutral-500'>
            {label} {!required && ` (${t('shared.optional')})`}
          </Text>
        </label>
      }
      placeholder={placeholder}
    />
  )
}

export default DateField
