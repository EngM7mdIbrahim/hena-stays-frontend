'use client'

import React, { PropsWithChildren } from 'react'
import { Button, ButtonProps } from '@mantine/core'

export interface PrimaryButtonProps extends PropsWithChildren {
  children: React.ReactNode

  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

function PrimaryButton({
  children,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps & PrimaryButtonProps) {
  return (
    <Button type={type} onClick={onClick} {...rest}>
      {children}
    </Button>
  )
}

export default PrimaryButton
