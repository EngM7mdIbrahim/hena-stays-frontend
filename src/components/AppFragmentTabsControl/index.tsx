'use client'

import React from 'react'
import { SegmentedControl, SegmentedControlProps } from '@mantine/core'

import { cn } from '@utils'

export interface AppFragmentTabsControlProps {
  border?: boolean
  textColor?: string
  notActiveBg?: string
  activeBg?: string
}

function AppFragmentTabsControl({
  value,
  onChange,
  data = [],
  notActiveBg,
  activeBg = 'bg-primary-gradient',
  border,
  textColor,

  ...props
}: SegmentedControlProps & AppFragmentTabsControlProps) {
  return (
    <SegmentedControl
      {...props}
      value={value}
      onChange={onChange}
      withItemsBorders={false}
      data={data}
      size='md'
      radius={8}
      className=''
      classNames={{
        root: '!gap-4 bg-transparent',
        label: cn(
          'text-primary font-normal segmented-control-label [&[data-active]]:bg-transparent ',
          notActiveBg,
          textColor,
          border && 'border'
        ),
        indicator: activeBg
      }}
    />
  )
}

export default AppFragmentTabsControl
