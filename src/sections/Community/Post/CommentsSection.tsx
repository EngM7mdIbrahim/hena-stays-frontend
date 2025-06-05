'use client'

import React from 'react'
import { Post as PostType, UserRole } from '@commonTypes'
import { DEFAULT_ADD_COMMENT_FORM_DATA, navigationLinks } from '@constants'
import { PostActivePanel } from '@enums'
import { useCommentsList, useCreateComment, useUser } from '@hooks'
import {
  Accordion,
  ActionIcon,
  Avatar,
  Button,
  ScrollArea,
  Text,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLocale, useTranslations } from 'next-intl'
import { BiSend } from 'react-icons/bi'

import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import { cn } from '@utils'

import Comment, { CommentSkeleton } from '../Comment'

export interface CommentsSectionProps {
  activePanel: PostActivePanel | null
  post: PostType
}

function CommentsSection({ activePanel, post }: CommentsSectionProps) {
  const t = useTranslations()
  const locale = useLocale()
  const { user } = useUser()
  const {
    comments,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useCommentsList({ postId: post?._id })

  const form = useForm({
    initialValues: DEFAULT_ADD_COMMENT_FORM_DATA,
    validate: {
      description: (value) => {
        if (!value) {
          return 'Comment is required'
        }
        return null
      }
    }
  })

  const createComment = useCreateComment({
    onSuccess: () => {
      form.reset()
    }
  })

  const onSubmitComment = (data: typeof DEFAULT_ADD_COMMENT_FORM_DATA) => {
    createComment.mutate({
      ...data,
      post: post?._id
    })
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Accordion multiple value={activePanel ? [activePanel] : []}>
      <Accordion.Item value={PostActivePanel.COMMENTS}>
        <Accordion.Panel>
          <Text fw={500} mb='xs'>
            {t('community.comments')}:
          </Text>
          <ScrollArea
            offsetScrollbars
            className={cn(comments?.length > 5 ? 'h-[500px]' : 'h-auto')}
          >
            <ItemsWrapper
              loading={isLoading}
              className='flex flex-col gap-4'
              LoadingComponent={<CommentSkeleton />}
              EmptyComponent={
                <EmptyWrapper
                  description={t('shared.emptyDescription', {
                    itemName: t('community.comments')
                  })}
                />
              }
            >
              {comments?.map((comment) => (
                <Comment key={comment?._id} comment={comment} />
              ))}
            </ItemsWrapper>
          </ScrollArea>
          {hasNextPage && (
            <Button
              variant='transparent'
              size='sm'
              className='p-0'
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Load More...
            </Button>
          )}
          {user?._id && (
            <form
              onSubmit={form.onSubmit(onSubmitComment)}
              className='flex items-end gap-3'
              style={{ width: '100%' }}
            >
              <Avatar
                src={
                  user?.role === UserRole.Admin
                    ? navigationLinks.assets.logo
                    : user?.image
                }
                radius='xl'
                size='md'
              />

              <TextInput
                {...form.getInputProps('description')}
                rightSection={
                  <ActionIcon
                    loading={createComment.isPending}
                    variant='transparent'
                    type='submit'
                    size='sm'
                  >
                    <BiSend
                      className={locale.startsWith('ar') ? 'rotate-180' : ''}
                      size={20}
                    />
                  </ActionIcon>
                }
                placeholder={t('community.writeComment')}
                style={{ flex: 1 }}
              />
            </form>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default CommentsSection
