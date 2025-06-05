'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chat as ChatEntity, User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import {
  useChatUtils,
  useMessagesList,
  useSocketIO,
  useSoundPlay,
  useUser
} from '@hooks'
import { Box, Loader, ScrollArea } from '@mantine/core'
import { useInViewport, useMediaQuery } from '@mantine/hooks'

import ChatMessage from '@components/Chat/ChatMessage'
import ChatMessageSkeleton from '@components/Chat/ChatMessageSkeleton'
import { cn } from '@utils'

import ChatHeader from './ChatHeader'
import { MessageBoxForm } from './MessageBoxForm'

export interface ChatProps {
  className?: string
  chat: ChatEntity
  onDismiss: () => void
}

export function ChatSkeleton({ className }: Pick<ChatProps, 'className'>) {
  return (
    <div className={cn('w-full', className)}>
      <ScrollArea offsetScrollbars className='mb-4 h-96'>
        {[...Array(5)].map((num, index) => (
          <ChatMessageSkeleton
            key={`loading-${num}-${Math.random()}`}
            isUser={index % 2 === 0}
          />
        ))}
      </ScrollArea>
    </div>
  )
}

function Chat({ className, chat, onDismiss }: ChatProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { user } = useUser()
  const { ref, inViewport } = useInViewport()
  const [isAtBottomThird, setIsAtBottomThird] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const playSound = useSoundPlay(navigationLinks.assets.incomingMessageAlert)
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'instant'
      })
    }
  }, [scrollAreaRef.current])
  const { getOtherUser } = useChatUtils()
  const otherUser = useMemo(() => getOtherUser(chat), [chat])
  const {
    messages,
    isInitialLoading,
    isFetchingNextPage,
    hasNextPage,
    onNewMessage,
    onDeleteMessage
  } = useMessagesList({
    chatId: chat._id,
    inViewport
  })
  useSocketIO({
    onNewMessage: (data) => {
      if (data.message.chat === chat._id) {
        onNewMessage(data)
        playSound()
      }
    },
    onDeleteMessage: (data) => {
      onDeleteMessage(data)
    }
  })

  const handleScrollPositionChange = useCallback(
    ({ y }: { y: number }) => {
      if (scrollAreaRef.current) {
        const scrollArea = scrollAreaRef.current
        const totalHeight = scrollArea.scrollHeight - scrollArea.clientHeight
        const bottomThirdThreshold = totalHeight * (2 / 3)
        setIsAtBottomThird(y >= bottomThirdThreshold)
      }
    },
    [scrollAreaRef.current]
  )

  // Scroll to the bottom of the chat when the user joins the chat
  useEffect(() => {
    scrollToBottom()
  }, [chat])

  // Scroll to the bottom of the chat if messages change and the user is at the bottom third of the chat
  useEffect(() => {
    if (isAtBottomThird) {
      scrollToBottom()
    }
  }, [messages])

  return isInitialLoading ? (
    <ChatSkeleton className={className} />
  ) : (
    <Box className={cn('w-full md:h-screen', className)}>
      {otherUser && (
        <ChatHeader
          onBackButtonClick={onDismiss}
          selectedUser={otherUser}
          showBackButton={Boolean(isMobile)}
        />
      )}
      <ScrollArea
        viewportRef={scrollAreaRef}
        onScrollPositionChange={handleScrollPositionChange}
        offsetScrollbars
        className='h-dvh md:h-[87dvh] lg:h-[88dvh]'
      >
        {isFetchingNextPage && (
          <Box className='flex w-full items-center justify-center p-2'>
            <Loader />
          </Box>
        )}
        {/* This is a div that is used to load more messages when the user scrolls to the bottom of the chat */}
        {hasNextPage && <div ref={ref} className='invisible opacity-0' />}
        {messages.map((message) => (
          <ChatMessage
            id={message?._id}
            key={message?._id}
            text={message?.text || ''}
            media={message?.media}
            isUser={
              isPopulated<User>(message?.sender) &&
              message?.sender?._id === user?._id
            }
            timestamp={message?.createdAt}
            sender={isPopulated<User>(message?.sender) ? message?.sender : null}
          />
        ))}
      </ScrollArea>
      <MessageBoxForm chatId={chat._id} />
    </Box>
  )
}

export default Chat
