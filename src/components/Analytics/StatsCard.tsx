import React from 'react'
import Image from 'next/image'
import { isNumber } from '@guards'
import { Card, Flex, Skeleton, Text, Tooltip } from '@mantine/core'
import moment from 'moment'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'

import { cn, formatNumberToShortForm } from '@utils'

export function StatsCardLoading() {
  return (
    <Card
      className='space-y-4 font-lexend'
      shadow='sm'
      padding='lg'
      radius='md'
    >
      <Skeleton height={20} radius='sm' />

      <Skeleton height={20} radius='sm' />
    </Card>
  )
}

export interface StatsCardProps {
  stat: {
    icon?: string
    title: string
    value: {
      prefix?: string
      value: number
      suffix?: string
    }
    percentage?: number
  }
  isLoading?: boolean
  lastSavedAt?: string
}

function StatsCard({ stat, isLoading, lastSavedAt }: StatsCardProps) {
  if (isLoading) {
    return <StatsCardLoading />
  }
  return (
    <Card
      className='space-y-4 font-lexend'
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
    >
      <Text className='text-sm font-semibold capitalize text-neutral-800'>
        {stat.title}
      </Text>
      <Flex className='items-center justify-between'>
        <Flex className='gap-2'>
          {stat.icon && (
            <Image
              className='dark:brightness-200'
              src={stat.icon}
              width={20}
              height={20}
              alt={stat.title}
            />
          )}
          <Text className='text-lg font-bold text-secondary dark:text-neutral-700'>
            {stat.value.prefix && <span>{stat.value.prefix}</span>}
            {isNumber(stat.value.value) &&
              formatNumberToShortForm(stat.value.value)}
            {stat.value.suffix && <span>{stat.value.suffix}</span>}
          </Text>
        </Flex>

        {stat.percentage && stat.percentage !== 0 && lastSavedAt ? (
          <Tooltip
            label={`Since ${moment(lastSavedAt).format('DD/MM/YYYY HH:mm')}`}
          >
            <Flex
              className={cn(
                'items-center gap-1',
                stat.percentage > 0
                  ? 'text-success-500'
                  : 'text-error-500 dark:brightness-200'
              )}
            >
              {stat.percentage.toFixed(2)}%{' '}
              {stat.percentage > 0 ? (
                <FaArrowTrendUp size={16} />
              ) : (
                <FaArrowTrendDown size={16} />
              )}
            </Flex>
          </Tooltip>
        ) : null}
      </Flex>
    </Card>
  )
}

export default StatsCard
