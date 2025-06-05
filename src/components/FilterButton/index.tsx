'use client'

import React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { IoFilterOutline } from 'react-icons/io5'

import { cn } from '@utils'

export interface FilterButtonProps {
  onFilter: () => void
}

function FilterButton({
  className,
  onFilter,
  ...rest
}: ButtonProps & FilterButtonProps) {
  return (
    <Button
      {...rest}
      onClick={onFilter}
      className={cn(
        'w-[90px] border-neutral-200 bg-white text-secondary',
        className
      )}
      leftSection={<IoFilterOutline color='#041a47' size={20} />}
    >
      Filter
    </Button>
  )
}

export default FilterButton
