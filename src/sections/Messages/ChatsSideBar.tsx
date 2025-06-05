import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Chat, Message, UserRole } from '@commonTypes'
import { SEARCH_PARAM_KEYS } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useChatsList,
  useChatUtils,
  useGetUserPermissions,
  useInfiniteScroll,
  useUser
} from '@hooks'
import { ScrollArea, Skeleton, Stack } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import SearchField from '@components/CustomFields/SearchField'
import EmptyWrapper from '@components/EmptyWrapper'
import ItemsWrapper from '@components/ItemWrapper'
import LoaderScreen from '@components/LoaderScreen'
import UserMessagePrev from '@components/UserMessagePrev'
import { cn } from '@utils'

import HelpCenterButton from './HelpCenterButton'

export interface UserMessageSidebarProps {
  chat: Chat | null
  handleSelectChat: (chat: Chat) => void
  isVisible: boolean
}

function ChatsSideBar({
  chat,
  handleSelectChat,
  isVisible
}: UserMessageSidebarProps) {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const { permissions } = useGetUserPermissions(Modules.CHAT)
  const chatId = searchParams?.get(SEARCH_PARAM_KEYS.CHAT_KEY)
  const { user } = useUser()
  const { ref, inViewport } = useInViewport()
  const { getOtherUser, getLastMessageText } = useChatUtils()
  const {
    chats,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    filters,
    setFilters
  } = useChatsList({
    getSupportChatsOnly: user?.role && user.role !== UserRole.Support,
    currentChat: chat
  })

  useEffect(() => {
    // If the user wants to chat with a specific chat, we will select it from the query params
    if (chatId && chats.length > 0) {
      const preselectedChat = chats.find((item) => item._id === chatId)
      if (preselectedChat) {
        handleSelectChat(preselectedChat)
      }
    }
  }, [chatId, chats])

  // In case the chats are updated, then we will update the selected chat
  useEffect(() => {
    if (chats.length > 0) {
      const newSelectedChat = chats.find((item) => item._id === chat?._id)
      if (newSelectedChat) {
        handleSelectChat(newSelectedChat)
      }
    }
  }, [chats])

  useInfiniteScroll(fetchNextPage, hasNextPage, [inViewport])

  return isVisible ? (
    <Stack className={cn('w-full border-e p-4 md:w-[50%] lg:w-[30%]')}>
      <SearchField
        onChange={(e) => setFilters({ ...filters, text: e.target?.value })}
        placeholder={t('chat.fields.search')}
      />
      {permissions.canSeeHelpCenterButton && (
        <HelpCenterButton handleSelectChat={handleSelectChat} />
      )}
      <ScrollArea className='h-dvh' offsetScrollbars>
        <ItemsWrapper
          className='flex flex-col gap-4'
          loading={isLoading}
          LoadingComponent={<Skeleton height={50} />}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('chat.chats')
              })}
            />
          }
        >
          {chats.map((currentChat) => {
            const otherUser = getOtherUser(currentChat)
            const lastMessageText = getLastMessageText(currentChat)
            return (
              <UserMessagePrev
                onClick={() => handleSelectChat(currentChat)}
                isSelected={chat?._id === currentChat._id}
                key={currentChat._id}
                name={otherUser?.name || ''}
                userImage={otherUser?.image || ''}
                lastMessage={lastMessageText}
                date={
                  isPopulated<Message>(currentChat.lastMessage) &&
                  currentChat.lastMessage.createdAt
                }
              />
            )
          })}
        </ItemsWrapper>
        {hasNextPage && (
          <button
            type='button'
            ref={ref}
            disabled={isFetchingNextPage}
            className='invisible opacity-0'
          >
            Load more
          </button>
        )}
        {isFetchingNextPage && <LoaderScreen />}
      </ScrollArea>
    </Stack>
  ) : null
}

export default ChatsSideBar
