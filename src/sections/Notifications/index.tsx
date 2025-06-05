import { useRouter } from 'next/navigation'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import {
  useDeleteNotification,
  useLinkConstructor,
  useNotificationsList
} from '@hooks'
import { ScrollArea, Stack } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LoaderScreen from '@components/LoaderScreen'
import Notification, { NotificationSkeleton } from '@components/Notification'
import { appNotifications, cn } from '@utils'

function NotificationsSection() {
  const router = useRouter()
  const t = useTranslations()
  const { constructLink } = useLinkConstructor()
  const { ref, inViewport } = useInViewport()
  const {
    notifications,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage
  } = useNotificationsList({
    inViewport
  })

  const handleNotificationClick = (type: any, payload: any) => {
    const url = navigationLinks.notifications.notificationsCallBack

    router.push(
      constructLink(url, {
        [SEARCH_PARAM_KEYS.TYPE_KEY]: type,
        [SEARCH_PARAM_KEYS.PAYLOAD_KEY]: JSON.stringify(payload)
      })
    )
  }
  const deleteNotification = useDeleteNotification({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('notifications.notification')
        })
      )
    }
  })

  const handleDeleteNotification = (id: string) => {
    deleteNotification.mutate({
      id
    })
  }
  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <ScrollArea className='h-[calc(100vh-200px)] px-3'>
      <Stack
        className={cn(
          'h-[calc(100vh-200px)] gap-4',
          notifications.length === 0 && 'justify-center'
        )}
      >
        <ItemsWrapper
          loading={isLoading}
          className='flex flex-col gap-4'
          LoadingComponent={<NotificationSkeleton />}
          EmptyComponent={
            <EmptyWrapper
              iconSize={150}
              descriptionClassName='text-2xl'
              description={t('shared.emptyDescription', {
                itemName: t('notifications.title')
              })}
            />
          }
        >
          {notifications.map((notification) => (
            <Notification
              onDelete={handleDeleteNotification}
              notification={notification}
              onClick={() =>
                handleNotificationClick(notification.type, notification.payload)
              }
              key={notification._id}
            />
          ))}
        </ItemsWrapper>

        {isFetchingNextPage && <LoaderScreen className='h-fit w-full' />}
      </Stack>
      {hasNextPage && (
        <button
          type='button'
          ref={ref}
          disabled={isFetchingNextPage}
          className='invisible opacity-0'
        >
          Load more
        </button>
      )}
    </ScrollArea>
  )
}

export default NotificationsSection
