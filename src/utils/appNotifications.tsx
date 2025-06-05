import Image from 'next/image'
import { NOTIFICATION_CONFIG } from '@constants'
import { NotificationStatus } from '@enums'
import { NotificationData, notifications } from '@mantine/notifications'
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSpinner
} from 'react-icons/fa'

import { Notification } from '@interfaces'

const colorMap = {
  [NotificationStatus.SUCCESS]: 'green',
  [NotificationStatus.ERROR]: 'red',
  [NotificationStatus.WARNING]: 'yellow',
  [NotificationStatus.INFO]: 'blue',
  [NotificationStatus.LOADING]: 'blue'
}

const defaultMessageMap = {
  [NotificationStatus.SUCCESS]: 'Success',
  [NotificationStatus.ERROR]: 'Error',
  [NotificationStatus.WARNING]: 'Warning',
  [NotificationStatus.INFO]: 'Info',
  [NotificationStatus.LOADING]: 'Loading'
}

const iconsMap = {
  [NotificationStatus.SUCCESS]: <FaCheckCircle />,
  [NotificationStatus.ERROR]: <FaExclamationTriangle />,
  [NotificationStatus.WARNING]: <FaExclamationTriangle />,
  [NotificationStatus.INFO]: <FaInfoCircle />,
  [NotificationStatus.LOADING]: <FaSpinner />
}

function getNotificationData(
  notificationOrMessage: Omit<Notification, 'status'> | string,
  type: NotificationStatus
): NotificationData & { image?: string } {
  return typeof notificationOrMessage === 'string'
    ? { message: defaultMessageMap[type], title: notificationOrMessage }
    : {
        ...notificationOrMessage,
        message: notificationOrMessage.body || defaultMessageMap[type],
        title: notificationOrMessage.title
      }
}
function showNotification(
  notificationOrMessage: Omit<Notification, 'status'> | string,
  type: NotificationStatus
) {
  const notificationId = crypto.randomUUID()
  const notification = getNotificationData(notificationOrMessage, type)
  notifications.show({
    ...NOTIFICATION_CONFIG,
    ...notification,
    onClick: (e) => {
      notification?.onClick?.(e)
      notifications.hide(notificationId)
    },
    id: notificationId,
    icon: notification?.image ? (
      <div className='relative h-10 w-10 overflow-hidden rounded-md'>
        <Image src={notification?.image} alt={defaultMessageMap[type]} fill />
      </div>
    ) : (
      iconsMap[type]
    ),
    color: colorMap[type],
    className:
      'hover:cursor-pointer hover:bg-neutral-100 transition-all duration-300 my-2',
    loading: type === NotificationStatus.LOADING
  })
  return notificationId
}

function success(notificationOrMessage: Omit<Notification, 'status'> | string) {
  return showNotification(notificationOrMessage, NotificationStatus.SUCCESS)
}

function error(notificationOrMessage: Omit<Notification, 'status'> | string) {
  return showNotification(notificationOrMessage, NotificationStatus.ERROR)
}

function warning(notificationOrMessage: Omit<Notification, 'status'> | string) {
  return showNotification(notificationOrMessage, NotificationStatus.WARNING)
}

function info(notificationOrMessage: Omit<Notification, 'status'> | string) {
  return showNotification(notificationOrMessage, NotificationStatus.INFO)
}

async function promise(
  promiseOrCallback: Promise<any> | (() => Promise<any>),
  options: {
    loading: Omit<Notification, 'status'> | string
    success: Omit<Notification, 'status'> | string
    error: Omit<Notification, 'status'> | string
  }
) {
  const notificationId = showNotification(
    options.loading,
    NotificationStatus.INFO
  )
  try {
    const result = await promiseOrCallback
    notifications.update({
      ...getNotificationData(options.success, NotificationStatus.SUCCESS),
      id: notificationId,
      loading: false
    })
    return result
  } catch (caughtError) {
    notifications.update({
      ...getNotificationData(options.error, NotificationStatus.ERROR),
      id: notificationId,
      loading: false
    })
    return notificationId
  }
}

export const appNotifications = {
  success,
  error,
  warning,
  info,
  promise
}
