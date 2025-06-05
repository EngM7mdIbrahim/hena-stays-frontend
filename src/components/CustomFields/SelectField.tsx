'use client'

import React from 'react'
import { Select, SelectProps, Text } from '@mantine/core'

import { cn } from '@utils'

function SelectField({
  label,
  required,
  showOptional = true,
  ...props
}: SelectProps & { showOptional?: boolean }) {
  return (
    <Select
      classNames={{
        input: cn(
          'w-full rounded-md mt-2 border bg-default-background border-neutral-400 focus:border-neutral-300 focus:outline-none',
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
              {label} {!required && showOptional && ` (Optional)`}
            </Text>
          </label>
        )
      }
    />
  )
}

export default SelectField
