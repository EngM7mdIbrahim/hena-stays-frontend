'use client'

import React from 'react'
import { TextInput, TextInputProps } from '@mantine/core'
import { CiSearch } from 'react-icons/ci'

import { cn } from '@utils'

function SearchField({ className, radius = 'md', ...rest }: TextInputProps) {
  return (
    <TextInput
      classNames={{
        input: cn('py-6 w-full bg-default-background border border-neutral-200')
      }}
      {...rest}
      leftSection={<CiSearch size={20} />}
      radius={radius}
      className={cn('min-w-[200px]', className)}
    />
  )
}

export default SearchField
