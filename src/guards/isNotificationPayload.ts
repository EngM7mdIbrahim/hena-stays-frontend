import {
  NotificationToPayloadMap,
  NotificationType,
  NotificationTypes
} from '@commonTypes'

import { isObject } from './isObject'
import { isString } from './isString'

const notificationPayloadValidatorMap: Record<
  NotificationType,
  (payload: any) => boolean
> = {
  [NotificationTypes.Follow]: (payload) => {
    return isString(payload?.follower) && isString(payload?.following)
  },
  [NotificationTypes.Message]: (payload) => {
    return (
      isString(payload?._id) &&
      isString(payload?.sender) &&
      isString(payload?.chat)
    )
  },
  [NotificationTypes.Property]: (payload) => {
    return isString(payload?._id) && isString(payload?.createdBy)
  },
  [NotificationTypes.Project]: (payload) => {
    return isString(payload?._id) && isString(payload?.owner)
  },
  [NotificationTypes.Like]: (payload) => {
    const entity = payload?.post || payload?.comment
    return isString(payload?.user) && isString(entity)
  },
  [NotificationTypes.Comment]: (payload) => {
    return (
      isString(payload?.user) &&
      isString(payload?.post) &&
      isString(payload?._id)
    )
  },
  [NotificationTypes.SellPropertyRequest]: (payload) => {
    return isString(payload?._id) && isString(payload?.createdBy)
  },
  [NotificationTypes.BuyPropertyRequest]: (payload) => {
    return isString(payload?._id) && isString(payload?.createdBy)
  },
  [NotificationTypes.Other]: (payload) => {
    return Object.keys(payload).every(
      (key) => isString(payload[key]) && isString(key)
    )
  }
}

export function isNotificationPayload<T extends keyof NotificationToPayloadMap>(
  type: T,
  payload: any
): payload is NotificationToPayloadMap[T] {
  return isObject(payload) && notificationPayloadValidatorMap[type](payload)
}
