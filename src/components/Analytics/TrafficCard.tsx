import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { isNumber } from '@guards'
import { Card, Flex, Text, Tooltip } from '@mantine/core'
import moment from 'moment'

import { cn, formatNumberToShortForm } from '@utils'

import { StatsCardLoading } from './StatsCard'

export interface TrafficCardProps {
  title: string
  value: string | number
  isLoading?: boolean
  percentage: number
  lastSavedAt?: string
}

function TrafficCard({
  title,
  value,
  isLoading,
  percentage,
  lastSavedAt
}: TrafficCardProps) {
  if (isLoading) {
    return <StatsCardLoading />
  }
  return (
    <Card
      className='space-y-4 border border-neutral-200 font-lexend'
      shadow='sm'
      padding='lg'
      radius='md'
    >
      <Flex className='items-center justify-between gap-1'>
        <Text className='text-sm font-semibold capitalize text-neutral-800'>
          {title}
        </Text>

        {percentage !== 0 && lastSavedAt ? (
          <Tooltip label={`Since ${moment(lastSavedAt).format('DD/MM/YYYY ')}`}>
            <Flex
              className={cn('items-center gap-1', {
                'text-success-500': percentage > 0,
                'text-error-500': percentage < 0
              })}
            >
              {percentage.toFixed(2)}%
            </Flex>
          </Tooltip>
        ) : null}
      </Flex>
      <Flex className='items-center justify-between'>
        <Text className='ml-2 text-xl font-bold text-secondary dark:text-neutral-700'>
          {isNumber(value) ? formatNumberToShortForm(value) : ''}
        </Text>
        {percentage !== 0 && (
          <Image
            src={
              percentage > 0
                ? navigationLinks.assets.analytics.statUp
                : navigationLinks.assets.analytics.statDown
            }
            alt={title}
            width={80}
            height={80}
          />
        )}
      </Flex>
    </Card>
  )
}

export default TrafficCard
