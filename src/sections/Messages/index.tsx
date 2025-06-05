'use client'

import React, { useState } from 'react'
import { Chat as ChatEntity } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useProtectRoute, useUser } from '@hooks'
import { Box, Flex, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import Chat from '@components/Chat'
import LoaderScreen from '@components/LoaderScreen'

import ChatsSideBar from './ChatsSideBar'

function Messages() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.chats'),
      link: navigationLinks.chats
    }
  ]
  const { user, loading } = useUser()
  const [selectedChat, setSelectedChat] = useState<ChatEntity | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const isSideBarVisible = !isMobile || (isMobile && !selectedChat)
  const isLoaded = useProtectRoute(!!user)

  if (loading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <Text className='max-w-3xl text-neutral-600'>
        {t('chat.description')}
      </Text>
      <Flex className='items-start rounded-md border'>
        {/* sidebar of recent messages */}
        <ChatsSideBar
          chat={selectedChat}
          handleSelectChat={(chat) => setSelectedChat(chat)}
          isVisible={isSideBarVisible}
        />
        {/* chat */}
        {selectedChat && (
          <Box className='w-full md:w-[50%] lg:w-[70%]'>
            <Chat onDismiss={() => setSelectedChat(null)} chat={selectedChat} />
          </Box>
        )}
      </Flex>
    </>
  )
}

export default Messages
