'use client'

import React from 'react'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaCheck } from 'react-icons/fa'

import { Direction } from '@interfaces'
import { cn } from '@utils'

export interface LabelValueProps {
  title: string
  value: string | number
  wrapperClassName?: string
  textClassName?: string
  direction?: Direction
  labelClassName?: string
  showCheck?: boolean
}

function LabelValue({
  title,
  value,
  wrapperClassName,
  textClassName,
  direction = 'row',
  labelClassName,
  showCheck = false
}: LabelValueProps) {
  const t = useTranslations()
  return (
    <Box
      className={cn(
        'flex items-center gap-1',
        direction === 'row' ? 'flex-row' : 'flex-col',
        wrapperClassName
      )}
    >
      <Text
        className={cn('text-sm font-semibold text-neutral-300', labelClassName)}
      >
        {title}
      </Text>
      <Flex className='gap-2'>
        {String(value)
          .split(', ')
          .slice(0, 3)
          .map((item) => (
            <Stack
              key={item}
              className='gap-1 text-sm font-semibold text-neutral-500'
            >
              <Text
                className={cn(
                  'font-semibold capitalize text-neutral-800',
                  textClassName
                )}
              >
                {item}
              </Text>
              {showCheck && (
                <Flex className='items-center gap-1'>
                  <FaCheck size={14} className='text-success-500' />
                  <Text className='text-lg font-medium'>{t('shared.yes')}</Text>
                </Flex>
              )}
            </Stack>
          ))}
      </Flex>
    </Box>
  )
}

export default LabelValue
