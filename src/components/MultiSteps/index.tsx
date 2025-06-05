'use client'

import React from 'react'
import { Stepper, StepperProps } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { cn } from '@utils'

export interface MultiStepsProps extends StepperProps {
  background?: string
}

function MultiSteps({
  active,
  onStepClick,
  children,
  background = 'bg-secondary-gradient',
  ...rest
}: MultiStepsProps) {
  const mediaQuery = useMediaQuery('(max-width:390px)')

  return (
    <Stepper
      orientation={mediaQuery ? 'vertical' : 'horizontal'}
      classNames={{
        step: cn(
          `flex items-center gap-4`,
          mediaQuery ? 'flex-row' : 'flex-col'
        ),
        stepIcon:
          'bg-default-background border border-neutral-300 overflow-hidden',
        stepCompletedIcon: cn(
          'text-white border border-transparent',
          background
        ),
        separator: 'bg-neutral-200',
        verticalSeparator: 'bg-neutral-300'
      }}
      allowNextStepsSelect={false}
      active={active}
      onStepClick={onStepClick}
      {...rest}
    >
      {children}
    </Stepper>
  )
}

export default MultiSteps
