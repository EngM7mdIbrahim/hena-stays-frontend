'use client'

import React from 'react'
import { Select, SelectProps } from '@mantine/core'
import { HiListBullet } from 'react-icons/hi2'

import { cn } from '@utils'

function LimitButton({ className, ...rest }: SelectProps) {
  return (
    <Select
      leftSection={<HiListBullet className='text-neutral-700' size={20} />}
      placeholder='Limit'
      {...rest}
      classNames={{
        input: 'bg-default-background'
      }}
      className={cn('w-full max-w-[200px] text-secondary', className)}
    />
  )
}

export default LimitButton
