'use client'

import React from 'react'
import { PinInput, PinInputProps } from '@mantine/core'

function OTPField({ ...rest }: PinInputProps) {
  return (
    <PinInput
      size='lg'
      {...rest}
      oneTimeCode
      inputType='tel'
      inputMode='numeric'
      autoFocus
    />
  )
}

export default OTPField
