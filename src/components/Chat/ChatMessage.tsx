'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Media, SOCKET_EVENTS, User } from '@commonTypes'
import { useSocketIO, useUser } from '@hooks'
import { ActionIcon, Avatar, Box, Flex, Text } from '@mantine/core'
import moment from 'moment'
import { useLocale, useTranslations } from 'next-intl'
import { BiChevronDown, BiTrash } from 'react-icons/bi'

import Actions from '@components/Actions'
import ImageGalleryModal from '@components/ImageGallery/ImagesGalleryModal'
import AppModal from '@components/Modals/AppModal'
import DeleteModal from '@components/Modals/DeleteModal'
import { cn } from '@utils'

export interface ChatMessageProps {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  className?: string
  sender?: User | null
  media?: Media[] | null
}
function ChatMessage({
  id,
  text,
  isUser,
  timestamp,
  className,
  sender,
  media
}: ChatMessageProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currIndex, setCurrIndex] = useState<number | null>(null)
  const { user } = useUser()
  const { emitEvent } = useSocketIO()

  const menuItems = [
    {
      label: t('shared.actions.delete'),
      icon: <BiTrash />,
      onClick: () => setShowDeleteModal(true)
    }
  ]

  const handleDelete = () => {
    emitEvent(SOCKET_EVENTS.DELETE_MESSAGE, { messageId: id })
    setShowDeleteModal(false)
  }

  const currentSender = isUser ? user : sender

  return (
    <Box className={cn(!isUser ? 'ml-4' : '', 'mb-4')}>
      <AppModal
        size='xl'
        title={t('chat.images')}
        open={currIndex !== null}
        setOpen={() => setCurrIndex(null)}
      >
        <ImageGalleryModal defaultIndex={currIndex || 0} images={media || []} />
      </AppModal>

      {media && media.length > 0 && (
        <Flex
          gap='xs'
          wrap='wrap'
          className='relative mb-2'
          justify={isUser ? 'flex-end' : 'flex-start'}
        >
          {media.map((mediaItem, index) => (
            <Box
              onClick={() => setCurrIndex(index)}
              key={mediaItem.url}
              className='relative cursor-pointer'
            >
              {mediaItem.type === 'image' ? (
                <Image
                  src={mediaItem.url}
                  alt={`Message image ${index + 1}`}
                  width={120}
                  height={120}
                  className='rounded-lg'
                />
              ) : (
                <video
                  src={mediaItem.url}
                  width={120}
                  height={120}
                  controls
                  className='rounded-lg'
                >
                  <track kind='captions' src='' label='English' default />
                </video>
              )}
            </Box>
          ))}
          {isUser && text.length === 0 && (
            <Actions
              items={menuItems}
              withinPortal={false}
              targetTrigger={
                <ActionIcon
                  className='absolute end-0 top-0'
                  onClick={(e) => e.stopPropagation()}
                  variant='default'
                  color='gray'
                  size='sm'
                >
                  <BiChevronDown />
                </ActionIcon>
              }
            />
          )}
        </Flex>
      )}
      <Box
        className={cn(
          'flex items-center gap-1',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        {currentSender && (
          <>
            <Avatar
              className='relative bottom-0'
              size='xs'
              src={currentSender?.image}
              name={currentSender?.name}
            />
            <Text component='p' className={cn('my-2 text-xs text-neutral-500')}>
              {isUser
                ? t('chat.you')
                : `${currentSender?.name} - ${currentSender?.role}`}
            </Text>
          </>
        )}
      </Box>
      <Flex
        className={cn(
          isUser ? 'justify-end' : 'justify-start',
          'relative gap-2',
          className
        )}
      >
        <Box
          className={cn(
            'max-w-[70%]',
            isUser
              ? 'rounded-t-full rounded-es-full bg-secondary text-white'
              : 'rounded-t-full rounded-ee-full bg-indigo-100 text-black',
            text.length > 0 ? 'block' : 'hidden',
            'p-2'
          )}
        >
          <Flex align='center'>
            <Text component='p' className='text-sm'>
              {text}
            </Text>
            {isUser && (
              <Actions
                items={menuItems}
                withinPortal={false}
                targetTrigger={
                  <ActionIcon variant='subtle' color='gray' size='sm'>
                    <BiChevronDown />
                  </ActionIcon>
                }
              />
            )}
          </Flex>
        </Box>
      </Flex>

      <Text
        component='p'
        className={cn(
          'text-xs text-neutral-500',
          isUser ? 'text-end' : 'text-start'
        )}
      >
        {moment(timestamp).locale(locale).format('MMM D, h:mm A')}
      </Text>

      <DeleteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        itemName={t('chat.message')}
        onDelete={handleDelete}
      />
    </Box>
  )
}

export default ChatMessage
