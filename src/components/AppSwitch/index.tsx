'use client'

import React from 'react'
import { Switch, SwitchProps } from '@mantine/core'

import { AppFragmentTabsControlProps } from '@components/AppFragmentTabsControl'
import { cn } from '@utils'

function AppSwitch({
  checked,
  onChange,
  activeBg = 'bg-secondary-gradient',
  ...rest
}: SwitchProps & Pick<AppFragmentTabsControlProps, 'activeBg'>) {
  return (
    <Switch
      classNames={{
        track: cn(' border-0', activeBg)
      }}
      checked={checked}
      onChange={onChange}
      {...rest}
    />
  )
}

export default AppSwitch
