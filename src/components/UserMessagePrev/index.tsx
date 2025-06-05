'use client'

import React from 'react'
import { Nullable } from '@commonTypes'
import { Avatar, Flex, Stack, Text } from '@mantine/core'
import moment from 'moment'
import { useLocale } from 'next-intl'

import 'moment/locale/ar'

import { cn } from '@utils'

export interface UserMessagePrevProps {
  name: string
  userImage: string | Nullable<string>
  lastMessage: string
  date: Date | false
  onClick?: () => void
  isSelected?: boolean
}

function UserMessagePrev({
  name,
  lastMessage,
  date,
  userImage,
  onClick,
  isSelected
}: UserMessagePrevProps) {
  const locale = useLocale()
  return (
    <Flex
      onClick={onClick}
      gap={10}
      className={cn(
        'cursor-pointer items-center border-b p-2 last-of-type:border-0 hover:bg-gray-200/35',
        isSelected && 'bg-brand-50 hover:bg-brand-50'
      )}
    >
      <Avatar name={name} size='lg' radius='xl' src={userImage} />
      <Stack className='flex-1' gap={2}>
        <Flex className='items-center justify-between'>
          <Text className='capitalize' fw={500}>
            {name}
          </Text>

          <Text size='xs'>
            {date ? moment(date).locale(locale).fromNow() : ''}
          </Text>
        </Flex>
        <Text size='sm' className='text-neutral-500'>
          {lastMessage}
        </Text>
      </Stack>
    </Flex>
  )
}

export default UserMessagePrev
