'use client'

import { useEffect, useState } from 'react'
import { FindAllCommentsResponse, User, UserRole } from '@commonTypes'
import { DEFAULT_ADD_COMMENT_FORM_DATA, navigationLinks } from '@constants'
import { Modules } from '@enums'
import {
  useCreateLike,
  useDeleteComment,
  useDeleteLike,
  useGetUserPermissions,
  useUpdateComment
} from '@hooks'
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useClickOutside } from '@mantine/hooks'
import { useLocale, useTranslations } from 'next-intl'
import { BiSend, BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications } from '@utils'

export function CommentSkeleton() {
  return (
    <Paper withBorder shadow='sm' p='lg' radius='md'>
      <Group align='center' gap='md'>
        <Skeleton height={40} width={40} circle />
        <Stack gap='xs' style={{ flex: 1 }}>
          <Skeleton height={10} width='30%' />
          <Skeleton height={10} width='80%' />
          <Skeleton height={10} width='60%' />
        </Stack>
      </Group>
    </Paper>
  )
}

export interface CommentProps {
  comment: FindAllCommentsResponse['items'][number]
  isReply?: boolean
}

function Comment({ comment, isReply = false }: CommentProps) {
  const t = useTranslations()
  const locale = useLocale()
  const { user, permissions } = useGetUserPermissions(Modules.COMMUNITY)
  const { canInteractWithPost } = permissions
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const ref = useClickOutside(() => {
    setIsEditing(false)
  })

  const createLike = useCreateLike()
  const deleteLike = useDeleteLike()

  const handleToggleLike = () => {
    if (comment.isLikedByMe) {
      deleteLike.mutate({
        id: comment._id
      })
    } else {
      createLike.mutate({
        comment: comment._id
      })
    }
  }

  const form = useForm({
    initialValues: DEFAULT_ADD_COMMENT_FORM_DATA,
    validate: {
      description: (value) => {
        if (!value) {
          return t('errorMessages.shared.required', {
            field: t('community.comment')
          })
        }
        return null
      }
    }
  })

  useEffect(() => {
    if (isEditing) {
      form.setValues({
        description: comment.description
      })
    }
  }, [isEditing])

  const updateComment = useUpdateComment({
    onSuccess: () => {
      setIsEditing(false)
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('community.comment')
        })
      )
    }
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const menuItems = [
    {
      label: t('shared.actions.edit'),
      icon: <PiPencilCircleLight />,
      onClick: () => handleEditClick()
    },
    {
      label: t('shared.actions.delete'),
      icon: <BiTrash />,
      onClick: () => setShowDeleteModal(true)
    }
  ]

  const handleSaveEdit = (data: typeof DEFAULT_ADD_COMMENT_FORM_DATA) => {
    updateComment.mutate({
      ...data,
      id: comment._id
    })
  }

  const deleteComment = useDeleteComment({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('community.comment')
        })
      )
      setShowDeleteModal(false)
    }
  })

  const handleDelete = () => {
    deleteComment.mutate({
      id: comment._id
    })
  }

  return (
    <Box ml={isReply ? 48 : 0} mb='xs'>
      <DeleteModal
        open={showDeleteModal}
        loading={deleteComment.isPending}
        setOpen={setShowDeleteModal}
        itemName={t('community.comment')}
        onDelete={handleDelete}
      />

      <Paper p='xs' radius='md'>
        <Group justify='space-between' align='flex-start' mb={4}>
          <Group align='flex-start'>
            <Avatar
              src={
                (comment.user as User)?.role === UserRole.Admin
                  ? navigationLinks.assets.logo
                  : (comment.user as User)?.image
              }
              radius='xl'
              size='sm'
            />
            <Box>
              <Text size='sm' className='capitalize' fw={500}>
                {(comment.user as User)?.name}
              </Text>

              {isEditing ? (
                <form ref={ref} onSubmit={form.onSubmit(handleSaveEdit)}>
                  <TextInput
                    {...form.getInputProps('description')}
                    rightSection={
                      <ActionIcon
                        loading={updateComment.isPending}
                        variant='transparent'
                        type='submit'
                        size='sm'
                      >
                        <BiSend
                          className={
                            locale.startsWith('ar') ? 'rotate-180' : ''
                          }
                          size={20}
                        />
                      </ActionIcon>
                    }
                    autoFocus
                  />
                </form>
              ) : (
                <Text size='sm'>{comment.description}</Text>
              )}

              {canInteractWithPost && (
                <Group className='mt-2 items-center gap-2'>
                  <Text size='sm' c='dimmed'>
                    {comment.likes}
                  </Text>

                  <ActionIcon
                    loading={createLike.isPending || deleteLike.isPending}
                    onClick={handleToggleLike}
                    variant='subtle'
                    color='gray'
                    size='xs'
                  >
                    {comment.isLikedByMe ? (
                      <FaHeart size={14} className='text-primary' />
                    ) : (
                      <FaRegHeart size={14} />
                    )}
                  </ActionIcon>
                </Group>
              )}
            </Box>
          </Group>
          {user?._id === (comment.user as User)?._id && (
            <Actions
              items={menuItems}
              withinPortal={false}
              targetTrigger={
                <ActionIcon variant='subtle' color='gray' size='sm'>
                  <BsThreeDots size={14} />
                </ActionIcon>
              }
            />
          )}
        </Group>
      </Paper>
    </Box>
  )
}

export default Comment
