'use client'

import React from 'react'
import { Select, SelectProps } from '@mantine/core'
import { HiArrowsUpDown } from 'react-icons/hi2'

import { cn } from '@utils'

function SortButton({ className, ...rest }: SelectProps) {
  return (
    <Select
      leftSection={<HiArrowsUpDown className='text-neutral-700' size={20} />}
      placeholder='Sort by'
      {...rest}
      classNames={{
        input: 'bg-default-background'
      }}
      className={cn('w-full max-w-[200px] text-secondary', className)}
    />
  )
}

export default SortButton
