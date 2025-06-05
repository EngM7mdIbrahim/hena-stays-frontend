import { NotificationToPayloadMap, NotificationTypes } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isNotificationPayload, isNotificationType } from '@guards'

import { constructLink } from './constructLink'

function getFollowNotificationLink(
  payload: NotificationToPayloadMap['Follow']
) {
  return navigationLinks.community.profile(payload.following)
}

function getMessageNotificationLink(
  payload: NotificationToPayloadMap['Message']
) {
  return constructLink(navigationLinks.userProfile.messages, {
    chat: payload.chat
  })
}

function getPropertyNotificationLink(
  payload: NotificationToPayloadMap['Property']
) {
  return navigationLinks.properties.viewProperty(payload._id)
}

function getProjectNotificationLink(
  payload: NotificationToPayloadMap['Project']
) {
  return navigationLinks.projects.viewProject(payload._id)
}

function getLikeNotificationLink(payload: NotificationToPayloadMap['Like']) {
  if (payload.post) {
    return navigationLinks.community.viewPost(payload.post)
  }
  // In case of like on comment
  return constructLink(navigationLinks.community.viewPost(payload.post), {
    activePanel: 'comments'
  })
}

function getCommentNotificationLink(
  payload: NotificationToPayloadMap['Comment']
) {
  return constructLink(navigationLinks.community.viewPost(payload.post), {
    activePanel: 'comments'
  })
}

function getSellPropertyRequestNotificationLink(
  payload: NotificationToPayloadMap['Sell Property Request']
) {
  return navigationLinks.sellPropertyRequests.viewSellPropertyRequest(
    payload._id
  )
}

// TODO: Add use for this as to make the allBuyPropertyRequests scroll to the request
function getBuyPropertyRequestNotificationLink(
  _payload: NotificationToPayloadMap['Buy Property Request']
) {
  return navigationLinks.buyPropertyRequests.allBuyPropertyRequests
}

function getOtherNotificationLink(_payload: NotificationToPayloadMap['Other']) {
  return navigationLinks.landingPage
}

export function constructNotificationLink(type: any, payload: any) {
  if (typeof window === 'undefined') {
    throw new Error(
      'constructNotificationLink is not available on the server side, use it on the client side'
    )
  }
  if (!isNotificationType(type)) {
    return navigationLinks.landingPage
  }
  if (!isNotificationPayload(type, payload)) {
    return navigationLinks.landingPage
  }

  switch (type) {
    case NotificationTypes.Follow:
      return getFollowNotificationLink(
        payload as NotificationToPayloadMap['Follow']
      )
    case NotificationTypes.Message:
      return getMessageNotificationLink(
        payload as NotificationToPayloadMap['Message']
      )
    case NotificationTypes.Property:
      return getPropertyNotificationLink(
        payload as NotificationToPayloadMap['Property']
      )
    case NotificationTypes.Project:
      return getProjectNotificationLink(
        payload as NotificationToPayloadMap['Project']
      )
    case NotificationTypes.Like:
      return getLikeNotificationLink(
        payload as NotificationToPayloadMap['Like']
      )
    case NotificationTypes.Comment:
      return getCommentNotificationLink(
        payload as NotificationToPayloadMap['Comment']
      )
    case NotificationTypes.SellPropertyRequest:
      return getSellPropertyRequestNotificationLink(
        payload as NotificationToPayloadMap['Sell Property Request']
      )
    case NotificationTypes.BuyPropertyRequest:
      return getBuyPropertyRequestNotificationLink(
        payload as NotificationToPayloadMap['Buy Property Request']
      )
    case NotificationTypes.Other:
      return getOtherNotificationLink(
        payload as NotificationToPayloadMap['Other']
      )
    default:
      return navigationLinks.landingPage
  }
}
