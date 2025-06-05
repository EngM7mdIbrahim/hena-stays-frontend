'use client'

import { Flex, Text } from '@mantine/core'
import { BsCheck } from 'react-icons/bs'

import { cn } from '@utils'

import { FormInputProps } from './TextField'

export interface RadioFieldProps extends FormInputProps {
  className?: string
  checked: boolean
  disabled?: boolean
}

function RadioField({
  label,
  value,
  disabled,
  checked,
  onChange,
  className
}: RadioFieldProps) {
  return (
    <Flex
      component='label'
      className={cn(
        'cursor-pointer items-center space-x-2',
        className,
        disabled ? 'opacity-50' : 'opacity-100'
      )}
    >
      <input
        id={label}
        disabled={disabled}
        type='radio'
        value={value}
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
      <Flex className='h-4 w-4 flex-shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-neutral-400'>
        {checked && (
          <Flex className='h-full w-full items-center justify-center bg-secondary-gradient text-white'>
            <BsCheck />
          </Flex>
        )}
      </Flex>
      <Text
        component='span'
        className='whitespace-nowrap text-sm text-neutral-500'
      >
        {label}
      </Text>
    </Flex>
  )
}

export default RadioField
