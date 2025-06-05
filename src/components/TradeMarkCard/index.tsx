'use client'

import React from 'react'
import { Box, Flex, Stack, Text } from '@mantine/core'

import { cn } from '@utils'

export interface TradeMarkCardProps {
  icon: JSX.Element
  title: string
  value: string
  className?: string
}

function TradeMarkCard({ icon, title, value, className }: TradeMarkCardProps) {
  return (
    <Flex
      className={cn(
        'items-center gap-2 rounded-md border border-gray-300 px-[15px] py-[12px]',
        className
      )}
    >
      <Box>{icon}</Box>
      <Stack gap={2}>
        <Text className='text-neutral-700'>{title}</Text>
        <Text className='text-lg'>{value}</Text>
      </Stack>
    </Flex>
  )
}

export default TradeMarkCard
