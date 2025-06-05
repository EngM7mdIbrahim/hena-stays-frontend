import type { NotificationData } from '@mantine/notifications'
import { FaX } from 'react-icons/fa6'

// Notification config
export const NOTIFICATION_CONFIG = {
  position: 'bottom-right' as NotificationData['position'],
  autoClose: 5000,
  withCloseButton: true,
  icon: FaX
}
