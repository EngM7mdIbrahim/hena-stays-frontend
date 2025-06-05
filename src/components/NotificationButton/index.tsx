'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { useCountNotifications, useDeleteAllNotifications } from '@hooks'
import { ActionIcon, Box, Button, Menu, Text } from '@mantine/core'
import NotificationsSection from '@sections/Notifications'
import { useTranslations } from 'next-intl'

import { appNotifications } from '@utils'

export interface NotificationButtonProps {
  className?: string
}

export default function NotificationButton({
  className
}: NotificationButtonProps) {
  const t = useTranslations()
  const { data: countNotifications } = useCountNotifications()
  const count = useMemo(
    () =>
      (countNotifications?.count ?? 0) > 9 ? '9+' : countNotifications?.count,
    [countNotifications]
  )

  const deleteAllNotifications = useDeleteAllNotifications({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('notifications.title')
        })
      )
    }
  })

  const handleClearAllNotifications = () => {
    deleteAllNotifications.mutate()
  }
  return (
    <Menu shadow='md' width={400}>
      <Menu.Target>
        <ActionIcon className={className} variant='transparent'>
          <Box className='relative h-5 w-5'>
            <Image
              src={navigationLinks.assets.notificationBell}
              fill
              alt='Notification Bell'
            />
            {count ? (
              <Box className='absolute -end-[2px] -top-[2px] flex h-3 w-3 items-center justify-center rounded-full bg-red-500'>
                <Text
                  component='p'
                  className='text-[5pt] font-semibold text-white'
                >
                  {count}
                </Text>
              </Box>
            ) : null}
          </Box>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label className='flex items-center justify-between'>
          <Text component='p' className='text-sm font-semibold'>
            {t('notifications.title')}
          </Text>
          <Button
            loading={deleteAllNotifications.isPending}
            onClick={handleClearAllNotifications}
            variant='light'
            color='gray'
            size='xs'
            radius='xl'
          >
            {t('notifications.clearAll')}
          </Button>
        </Menu.Label>
        <NotificationsSection />
      </Menu.Dropdown>
    </Menu>
  )
}
