import { NotificationStatus } from '@enums'

export interface Notification {
  onClick?: () => void
  title: string
  body?: string
  image?: string
  status: NotificationStatus
}
