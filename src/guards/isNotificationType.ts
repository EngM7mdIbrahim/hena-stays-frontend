import { NotificationType, NotificationTypes } from '@commonTypes'

export function isNotificationType(type: any): type is NotificationType {
  return Object.values(NotificationTypes).includes(type)
}
