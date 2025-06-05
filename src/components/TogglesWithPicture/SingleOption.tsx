'use client'

import React from 'react'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { IconType } from 'react-icons'
import { FaCheck } from 'react-icons/fa6'

import { cn } from '@utils'

export interface SingleOptionProps<T> {
  icon?: IconType | ((props: { className?: string }) => React.ReactElement)
  label: string
  selected: boolean
  onClick: (option: T) => void
  className?: string
  value: T
}

function SingleOption<T>({
  icon: Icon,
  label,
  selected,
  onClick,
  className,
  value
}: SingleOptionProps<T>) {
  return (
    <Flex
      role='button'
      onClick={() => onClick(value)}
      className={cn(
        `relative h-52 w-60 cursor-pointer items-center justify-center space-x-2 rounded-lg transition-colors duration-300 ease-in-out`,
        selected
          ? 'bg-secondary-gradient p-[3px]'
          : 'border border-neutral-300',
        className
      )}
    >
      <Flex
        className={cn(
          'relative h-full w-full items-center justify-center rounded-lg bg-default-background transition-colors duration-300 ease-in-out'
        )}
      >
        <Stack className='items-center gap-2'>
          {Icon && (
            <Icon
              className={`mb-2 h-16 w-16 transition-colors duration-300 ${
                selected
                  ? 'fill-blue-800 stroke-blue-800 text-blue-800'
                  : 'fill-neutral-500 stroke-neutral-500 text-neutral-500'
              }`}
            />
          )}
          <Text
            component='p'
            className={cn(
              'text-sm font-semibold text-neutral-500 transition-colors duration-300'
            )}
          >
            {label}
          </Text>
        </Stack>

        {/* Checkmark  */}
        {selected && (
          <Box className='absolute bottom-[-7px] end-[-7px] rounded-full bg-gradient-to-r from-blue-500 to-blue-800 p-1'>
            <FaCheck color='white' />
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default SingleOption
