import {
  Chat,
  ChatTypes,
  MediaTypes,
  Message,
  User,
  UserRole
} from '@commonTypes'
import { isPopulated } from '@guards'

import { capitalizeFirstLetter } from '@utils'

import { useDefaultSupportUser } from './useDefaultSupportUser'
import { useUser } from './useUser'

export function useChatUtils() {
  const { user } = useUser()
  const { defaultSupportUser } = useDefaultSupportUser()

  const getIsTalkingToSupport = (chat: Chat | null) => {
    const isTalkingToSupport =
      user?.role !== UserRole.Support && chat?.type === ChatTypes.SUPPORT
    return isTalkingToSupport
  }

  const getOtherUser = (currentChat: Chat | null) => {
    const isTalkingToSupport = getIsTalkingToSupport(currentChat)
    if (isTalkingToSupport) {
      return defaultSupportUser
    }
    if (!currentChat) {
      return null
    }
    const otherUser = currentChat.users.every((currentUser) =>
      isPopulated<User>(currentUser)
    )
      ? currentChat.users.find(
          (currentUser) =>
            user?._id !== currentUser?._id &&
            currentUser?.role !== UserRole.Support
        )
      : null
    return otherUser
  }

  const getLastMessageText = (currentChat: Chat) => {
    if (isPopulated<Message>(currentChat.lastMessage)) {
      return currentChat.lastMessage.sender !== user?._id
        ? currentChat.lastMessage.text
        : `You: ${currentChat.lastMessage.text}`
    }
    return ''
  }

  const getMessageNotificationText = (message: Message) => {
    if (isPopulated<User>(message.sender)) {
      const sender =
        message.sender.role === UserRole.Support
          ? 'Support'
          : capitalizeFirstLetter(message.sender.name)
      let mediaText = ''
      if (message.media?.length) {
        const photosCount = message.media.filter(
          (media) => media.type === MediaTypes.Image
        ).length
        const videosCount = message.media.filter(
          (media) => media.type === MediaTypes.Video
        ).length
        if (photosCount > 0 && videosCount > 0) {
          mediaText += `sent ${photosCount} photos, ${videosCount} videos`
        } else if (photosCount > 0) {
          mediaText += `sent ${photosCount} photo(s)`
        } else if (videosCount > 0) {
          mediaText += `sent ${videosCount} video(s)`
        }
        mediaText += ` with message: `
      }
      const messageText = message.text.slice(0, 20)
      return `${sender}: ${mediaText} ${messageText}`
    }
    return ''
  }

  return {
    getLastMessageText,
    getOtherUser,
    getIsTalkingToSupport,
    getMessageNotificationText
  }
}
