'use client'

import { CheckboxProps, Flex, Text } from '@mantine/core'
import { BsCheck } from 'react-icons/bs'

import { cn } from '@utils'

import { FormInputProps } from './TextField'

export interface CheckboxFieldProps extends FormInputProps {
  className?: string
  boxClassName?: string
  checked: boolean
  backgroundColor?: string
}

function CheckboxField({
  label,
  value = '',
  checked,
  backgroundColor = 'bg-secondary-gradient',

  onChange,
  boxClassName,
  className
}: CheckboxFieldProps & CheckboxProps) {
  return (
    <Flex
      component='label'
      className={cn('w-fit cursor-pointer items-center space-x-2', className)}
    >
      <input
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
      <Flex
        className={cn(
          'h-4 w-4 items-center justify-center overflow-hidden rounded-[5px] border border-neutral-400',
          boxClassName
        )}
      >
        {checked && (
          <Flex
            className={cn(
              'h-full w-full items-center justify-center text-white',
              backgroundColor
            )}
          >
            <BsCheck />
          </Flex>
        )}
      </Flex>
      <Text component='span' className='text-sm font-medium text-neutral-500'>
        {label}
      </Text>
    </Flex>
  )
}

export default CheckboxField
