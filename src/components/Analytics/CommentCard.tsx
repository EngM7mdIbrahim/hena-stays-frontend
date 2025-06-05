import React from 'react'
import { useRouter } from 'next/navigation'
import { Comment, Post, User } from '@commonTypes'
import { navigationLinks, POST_ACTIVE_PANEL_KEY } from '@constants'
import { PostActivePanel } from '@enums'
import { isPopulated } from '@guards'
import { useLinkConstructor } from '@hooks'
import { Card, Flex, Skeleton, Text, UnstyledButton } from '@mantine/core'
import moment from 'moment'

import { appNotifications } from '@utils'

export function LoadingCommentCard() {
  return (
    <Card className='mb-4 space-y-2 p-4 shadow-lg last:mb-0' radius='md'>
      <Flex className='items-center justify-between'>
        <Skeleton height={20} radius='sm' width='20%' />
        <Skeleton height={20} radius='sm' width='20%' />
      </Flex>
      <Skeleton height={20} radius='sm' width='100%' />
      <Skeleton height={20} radius='sm' width='80%' />
      <Skeleton height={20} radius='sm' width='70%' />
      <Skeleton height={20} radius='sm' width='60%' />
    </Card>
  )
}

export interface CommentCardProps {
  comment: Comment
}

function CommentCard({ comment }: CommentCardProps) {
  const router = useRouter()
  const { constructLink } = useLinkConstructor()

  return (
    <UnstyledButton
      onClick={() => {
        if (isPopulated<Post>(comment.post)) {
          router.push(
            constructLink(
              navigationLinks.community.viewPost(comment.post._id),
              {
                [POST_ACTIVE_PANEL_KEY]: PostActivePanel.COMMENTS
              }
            )
          )
        } else {
          appNotifications.error('Post not found or deleted for this comment')
        }
      }}
      variant=''
      className='mb-4 w-full space-y-2 last:mb-0'
    >
      <Card className='border border-neutral-200 p-4 shadow-lg' radius='md'>
        <Flex className='items-center justify-between'>
          <Text className='font-semibold'>
            {isPopulated<User>(comment.user) ? comment.user.name : 'Unknown'}
          </Text>
          <Text className='text-sm font-semibold text-neutral-600'>
            {moment(comment.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </Flex>
        <Text>{comment.description}</Text>
      </Card>
    </UnstyledButton>
  )
}

export default CommentCard
