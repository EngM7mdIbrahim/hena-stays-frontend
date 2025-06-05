import Image from 'next/image'
import { Notification as NotificationType } from '@commonTypes'
import { Box, Flex, Skeleton, Stack, Text } from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale } from 'next-intl'
import { IoClose } from 'react-icons/io5'

import { cn } from '@utils'

export function NotificationSkeleton() {
  return (
    <Flex className='items-center justify-between gap-2 p-4'>
      <Skeleton
        radius='xl'
        className='aspect-square w-14 rounded-lg object-cover'
      />
      <Stack className='w-full gap-2 rounded-lg p-4 shadow-sm'>
        <Skeleton height={20} width='80%' />
        <Skeleton height={16} width='60%' />
      </Stack>
    </Flex>
  )
}

interface NotificationProps {
  notification: NotificationType
  onClick?: () => void
  onDelete: (id: string) => void
}

function Notification({ notification, onClick, onDelete }: NotificationProps) {
  const locale = useLocale()
  return (
    <Flex
      onClick={onClick}
      className='relative cursor-pointer items-center gap-4 rounded-lg bg-default-background p-4 shadow-lg'
    >
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation()
          onDelete(notification._id)
        }}
        className='absolute start-0 top-0 z-10 rounded-full bg-red-500 p-px text-white'
      >
        <IoClose size={10} />
      </button>

      {notification.image && (
        <Image
          width={50}
          height={50}
          src={notification.image}
          alt={notification.title}
          className='h-12 w-12 rounded-lg object-cover'
        />
      )}
      <Stack className='flex-1 gap-2'>
        <Flex className='items-center justify-between gap-2'>
          <Text
            component='h1'
            className='flex-1 text-lg font-semibold text-neutral-800'
          >
            {notification.title}
          </Text>
          {notification.read && (
            <Text className='text-sm text-neutral-600'>
              {moment(notification.createdAt).locale(locale).fromNow()}
            </Text>
          )}
          <Box
            className={cn(
              'h-2 w-2 rounded-full bg-success-500',
              notification.read && 'hidden'
            )}
          />
        </Flex>
        <Text className='text-sm text-neutral-500'>{notification.body}</Text>
      </Stack>
    </Flex>
  )
}

export default Notification
