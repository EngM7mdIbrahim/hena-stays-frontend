'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Entities, FindAllPostsResponse, User, UserRole } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { CommunityActions, Modules, PostActivePanel, PostTypes } from '@enums'
import {
  useAddPostSave,
  useCreateFollow,
  useCreateLike,
  useDeleteFollow,
  useDeleteLike,
  useDeletePost,
  useDeletePostSave,
  useGetUserPermissions,
  useLinkConstructor,
  useProtectAction
} from '@hooks'
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Text
} from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { FiMessageCircle } from 'react-icons/fi'
import { IoMdPersonAdd, IoMdShareAlt } from 'react-icons/io'
import { PiPencilCircleLight } from 'react-icons/pi'
import { RiUserUnfollowFill } from 'react-icons/ri'

import Actions from '@components/Actions'
import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications, cn, userRoleMap } from '@utils'

import EditPost from '../EditPost'
import CommentsSection from './CommentsSection'
import PostCarousel from './PostCarousel'

export interface PostProps {
  post: FindAllPostsResponse['items'][number]
  initialActivePanel?: PostActivePanel | null
}

function Post({ post, initialActivePanel = null }: PostProps) {
  const t = useTranslations()
  const { user, permissions } = useGetUserPermissions(Modules.COMMUNITY)
  const { canEditPost, canDeletePost, canInteractWithPost } = permissions
  const [activePanel, setActivePanel] = useState<PostActivePanel | null>(
    initialActivePanel
  )
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false)

  const [toggleFollow, setToggleFollow] = useState(post?.isFollowedByMe)

  const { constructLink } = useLinkConstructor()
  const protectAction = useProtectAction()

  const menuItems = [
    ...(canEditPost(user, post)
      ? [
          {
            label: t('shared.actions.edit'),
            icon: <PiPencilCircleLight />,
            onClick: () => setShowEditModal(true)
          }
        ]
      : []),
    ...(canDeletePost(user, post)
      ? [
          {
            label: t('shared.actions.delete'),
            icon: <BiTrash />,
            onClick: () => setShowDeleteModal(true)
          }
        ]
      : [])
  ]

  // Function to toggle accordion on comment click
  const handleCommentClick = () => {
    if (activePanel === PostActivePanel.COMMENTS) {
      setActivePanel(null) // Collapse comments if already expanded
    } else {
      setActivePanel(PostActivePanel.COMMENTS) // Expand comments
    }
  }

  const createLike = useCreateLike()
  const deleteLike = useDeleteLike()
  const addSave = useAddPostSave({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.savedSuccessfully', {
          item: t('community.post')
        })
      )
    }
  })

  const deleteSave = useDeletePostSave({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.unsavedSuccessfully', {
          item: t('community.post')
        })
      )
    }
  })

  const deletePost = useDeletePost({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('community.post')
        })
      )
      setShowDeleteModal(false)
    }
  })

  const handleToggleLike = () => {
    if (canInteractWithPost) {
      if (post?.isLikedByMe) {
        deleteLike.mutate({
          id: post?._id
        })
      } else {
        createLike.mutate({
          post: post?._id
        })
      }
    } else {
      protectAction({
        action: {
          entity: Entities.POST,
          action: CommunityActions.LIKE,
          id: post?._id
        }
      })
    }
  }

  const handleToggleSave = () => {
    if (canInteractWithPost) {
      if (post?.isSavedByMe) {
        deleteSave.mutate({
          id: post?._id
        })
      } else {
        addSave.mutate({
          post: post?._id
        })
      }
    } else {
      protectAction({
        action: {
          entity: Entities.POST,
          action: CommunityActions.SAVE,
          id: post?._id
        }
      })
    }
  }

  const createFollow = useCreateFollow({
    onSuccess: () => {
      appNotifications.success(t('community.successMessages.followed'))
      setToggleFollow(!toggleFollow)
    }
  })
  const deleteFollow = useDeleteFollow({
    onSuccess: () => {
      appNotifications.success(t('community.successMessages.unfollowed'))
      setToggleFollow(!toggleFollow)
    }
  })

  const handleToggleFollow = () => {
    if (post?.isFollowedByMe) {
      deleteFollow.mutate({
        following: (post?.user as User)?._id
      })
    } else {
      createFollow.mutate({
        following: (post?.user as User)?._id
      })
    }
  }

  const handleDelete = () => {
    deletePost.mutate({
      id: post?._id
    })
  }

  const handleShareClick = () => {
    navigator.clipboard.writeText(
      window.location.origin + navigationLinks.community.viewPost(post?._id)
    )
    appNotifications.success(t('shared.shareModal.notifications.copied'))
  }

  return (
    <Card shadow='sm' radius='md' className='mb-12'>
      {showEditModal && (
        <EditPost
          postId={post?._id}
          openModal={showEditModal}
          setOpenModal={setShowEditModal}
        />
      )}
      <DeleteModal
        open={showDeleteModal}
        loading={deletePost.isPending}
        setOpen={setShowDeleteModal}
        itemName='this post'
        onDelete={handleDelete}
      />
      <Card shadow='none' p={0} radius='md'>
        <Group mb='md' justify='space-between'>
          <Link
            className='flex items-center gap-4'
            href={{
              pathname: constructLink(
                navigationLinks.community.profile((post?.user as User)?._id)
              ),
              query: {
                [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
              }
            }}
          >
            <Avatar
              src={
                (post?.user as User)?.role === UserRole.Admin
                  ? navigationLinks.assets.logo
                  : (post?.user as User)?.image
              }
              radius='xl'
            />
            <Box>
              <Text fw={500} className='text-sm capitalize md:text-base'>
                {(post?.user as User)?.name}
              </Text>
              <Text size='sm' c='dimmed'>
                {userRoleMap(t, (post?.user as User)?.role)}
              </Text>
            </Box>
          </Link>

          {user && user._id !== (post?.user as User)?._id && (
            <Button
              loading={createFollow.isPending || deleteFollow.isPending}
              variant='transparent'
              className={cn(
                user?.role?.includes(UserRole.Admin) && 'hidden',
                'p-0'
              )}
              onClick={handleToggleFollow}
            >
              {toggleFollow ? (
                <RiUserUnfollowFill size={30} className='text-red-500' />
              ) : (
                <IoMdPersonAdd size={30} className='text-blue-800' />
              )}
            </Button>
          )}
          {menuItems.length > 0 && (
            <Actions
              withinPortal={false}
              items={menuItems}
              targetTrigger={
                <ActionIcon radius='xl' variant='subtle' color='gray' size='lg'>
                  <BsThreeDotsVertical cursor='pointer' size={20} />
                </ActionIcon>
              }
            />
          )}
        </Group>

        <Text size='sm' fw={500} mb='md'>
          {post?.description}
        </Text>

        <PostCarousel slides={post?.media} />

        <Group justify='space-between'>
          <Flex gap={8}>
            <Group gap={4}>
              <ActionIcon
                loading={createLike.isPending || deleteLike.isPending}
                onClick={handleToggleLike}
                variant='subtle'
                color='gray'
              >
                {post?.isLikedByMe ? (
                  <FaHeart className='text-primary' size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </ActionIcon>
              <Text size='sm'>{post?.likes}</Text>
            </Group>
            <Group gap={4}>
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={handleCommentClick}
              >
                <FiMessageCircle size={20} />
              </ActionIcon>
              <Text size='sm'>{post?.comments}</Text>
            </Group>
            <Group gap={4}>
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={handleShareClick}
              >
                <IoMdShareAlt size={20} />
              </ActionIcon>
            </Group>
          </Flex>
          <Group gap={4}>
            <ActionIcon
              loading={addSave.isPending || deleteSave.isPending}
              onClick={handleToggleSave}
              variant='subtle'
              color='gray'
            >
              {post?.isSavedByMe ? (
                <FaBookmark className='text-primary' size={20} />
              ) : (
                <FaRegBookmark size={20} />
              )}
            </ActionIcon>
          </Group>
        </Group>

        <Box mt='md'>
          {/* Accordion for comments */}
          {activePanel && (
            <CommentsSection activePanel={activePanel} post={post} />
          )}
        </Box>
      </Card>
    </Card>
  )
}

export default Post
