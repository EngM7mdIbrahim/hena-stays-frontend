import { useCallback, useEffect, useState } from 'react'
import {
  Chat,
  FindAllChatsRequestQuery,
  SOCKET_EVENTS,
  SocketServerToClientMap,
  User
} from '@commonTypes'
import { isPopulated } from '@guards'

import { useGetChats } from '@hooks/query/chats/useGetChats'
import { useChatUtils } from '@hooks/useChatUtils'
import { useSocketIO } from '@hooks/useSocketIO'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'
import { appNotifications, extractItems } from '@utils'

export interface ChatsListProps {
  getSupportChatsOnly?: boolean
  currentChat?: Chat | null
}

export function useChatsList({
  getSupportChatsOnly = false,
  currentChat
}: ChatsListProps) {
  const [filters, setFilters] = useState<
    Pick<FindAllChatsRequestQuery, 'filter' | 'text'>
  >({})
  const [chats, setChats] = useState<Chat[]>([])

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters
  })
  const { getMessageNotificationText } = useChatUtils()

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useGetChats({
    showFields: {
      users: true
    },
    sort: {
      createdAt: -1
    },

    text: filters.text,
    support: getSupportChatsOnly
  })
  const handleUserOnline: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_ONLINE] =
    useCallback(
      (eventData) => {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            const chatUsers = chat.users.map((user) => {
              if (isPopulated<User>(user) && user._id === eventData.user._id) {
                return { ...user, chatMeta: { ...user.chatMeta, online: true } }
              }
              return user
            })
            return { ...chat, users: chatUsers }
          })
        )
      },
      [chats]
    )
  const handleUserOffline: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_OFFLINE] =
    useCallback(
      (eventData) => {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            const chatUsers = chat.users.map((user) => {
              if (isPopulated<User>(user) && user._id === eventData.user._id) {
                return {
                  ...user,
                  chatMeta: { ...user.chatMeta, online: false }
                }
              }
              return user
            })
            return { ...chat, users: chatUsers }
          })
        )
      },
      [chats]
    )

  const handleUserTyping: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_TYPING] =
    useCallback(
      (eventData) => {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            const chatUsers = chat.users.map((user) => {
              if (isPopulated<User>(user) && user._id === eventData.user._id) {
                return { ...user, chatMeta: { ...user.chatMeta, typing: true } }
              }
              return user
            })
            return { ...chat, users: chatUsers }
          })
        )
      },
      [chats]
    )

  const handleUserStopTyping: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_STOP_TYPING] =
    useCallback(
      (eventData) => {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            const chatUsers = chat.users.map((user) => {
              if (isPopulated<User>(user) && user._id === eventData.user._id) {
                return {
                  ...user,
                  chatMeta: { ...user.chatMeta, typing: false }
                }
              }
              return user
            })
            return { ...chat, users: chatUsers }
          })
        )
      },
      [chats]
    )

  const { emitEvent } = useSocketIO({
    onNewMessage: ({ message }) => {
      refetch()
      if (currentChat?._id !== message.chat) {
        appNotifications.info(getMessageNotificationText(message))
      }
    },
    onUserOnline: handleUserOnline,
    onUserOffline: handleUserOffline,
    onUserTyping: handleUserTyping,
    onUserStopTyping: handleUserStopTyping
  })

  useEffect(() => {
    setChats(extractItems(data))
  }, [data])

  useEffect(() => {
    chats.forEach((chat) => {
      emitEvent(SOCKET_EVENTS.JOIN_CHAT, {
        chatId: chat._id
      })
    })
    return () => {
      chats.forEach((chat) => {
        emitEvent(SOCKET_EVENTS.LEAVE_CHAT, {
          chatId: chat._id
        })
      })
    }
  }, [chats.length])
  return {
    chats,
    filters,
    setFilters,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  }
}
