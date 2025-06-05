'use client'

import { useEffect, useMemo, useState } from 'react'
import { Message, SOCKET_EVENTS, SocketServerToClientMap } from '@commonTypes'

import { useGetChatMessages } from '@hooks/query'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { extractItems } from '@utils'

export interface MessagesListProps {
  chatId: string
  inViewport: boolean
}

export function useMessagesList({ chatId, inViewport }: MessagesListProps) {
  const {
    data: initialMessages,
    isLoading: isInitialLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useGetChatMessages(
    {
      id: chatId,
      sort: {
        createdAt: -1
      },
      showFields: {
        sender: true
      }
    },
    {
      refetchOnWindowFocus: false
    }
  )
  useInfiniteScroll(fetchNextPage, hasNextPage, [inViewport])

  const [socketMessages, setSocketMessages] = useState<Message[]>([])

  // Reset socket messages when chatId changes and refetch messages
  useEffect(() => {
    refetch()
    setSocketMessages([])
  }, [chatId])

  const messages = useMemo(() => {
    return [...extractItems(initialMessages).reverse(), ...socketMessages]
  }, [initialMessages, socketMessages])

  const onNewMessage: SocketServerToClientMap[typeof SOCKET_EVENTS.NEW_MESSAGE] =
    ({ message }) => {
      setSocketMessages((prev) => [...prev, message])
    }

  const onDeleteMessage: SocketServerToClientMap[typeof SOCKET_EVENTS.DELETE_MESSAGE] =
    ({ messageId }) => {
      const checkInInitialMessages = extractItems(initialMessages).some(
        (message) => message._id === messageId
      )
      if (checkInInitialMessages) {
        refetch()
      } else {
        setSocketMessages((prev) =>
          prev.filter((message) => message._id !== messageId)
        )
      }
    }

  return {
    messages,
    isInitialLoading,
    hasNextPage,
    isFetchingNextPage,
    onNewMessage,
    onDeleteMessage
  }
}
