import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Blog, User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import { useDeleteBlog, useGetUserPermissions } from '@hooks'
import { Box, Card, Flex, Text } from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'
import { BiPencil, BiTrash } from 'react-icons/bi'

import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications } from '@utils'

export interface BlogCardProps {
  blog?: Blog | null
  width?: number
}

function BlogCard({ blog, width }: BlogCardProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { user, permissions } = useGetUserPermissions()
  const { canEditBlogPost, canDeleteBlogPost } = permissions

  const handleDeleteSuccess = (message: string) => {
    appNotifications.success(message)
    setShowDeleteModal(false)
  }

  const deleteBlog = useDeleteBlog({
    onSuccess: () =>
      handleDeleteSuccess(
        t('successMessages.deletedSuccessfully', {
          item: t('community.blog')
        })
      )
  })

  const handleDelete = () => {
    if (blog) {
      deleteBlog.mutate({ id: blog._id })
    }
  }

  const isCompact = width && width < 768 // Define "compact" based on width

  const handleEdit = () => {
    return navigationLinks.community.editBlogPost(blog?._id)
  }

  const handleClick = () => {
    if (blog) {
      router.push(
        navigationLinks.community.profileBlogView(
          (blog?.user as User)?._id,
          blog?._id
        )
      )
    }
  }

  return (
    <Card
      onClick={handleClick}
      radius='md'
      withBorder
      className='cursor-pointer rounded-md border border-neutral-200 p-0 shadow-sm sm:h-32'
    >
      <DeleteModal
        open={showDeleteModal}
        loading={deleteBlog.isPending}
        setOpen={setShowDeleteModal}
        itemName={t('community.blog')}
        onDelete={handleDelete}
      />
      <Box
        className={`relative h-full ${
          isCompact ? 'flex flex-col gap-4' : 'flex flex-row items-center gap-6'
        }`}
      >
        <Box className='relative h-52 w-full md:h-full md:w-52'>
          <Image
            src={blog?.media?.[0]?.url || navigationLinks.assets.placeholder}
            alt={blog?.title || 'Article Thumbnail'}
            fill
            className='h-full w-full object-cover'
          />
        </Box>

        <Box className={isCompact ? 'p-4' : 'w-full p-0'}>
          <Text
            className={`line-clamp-1 text-lg font-bold ${isCompact ? 'mt-2' : 'mt-0'}`}
            component='h3'
          >
            {blog?.title}
          </Text>
          <Text className='mt-2 line-clamp-2 pe-1 text-sm text-neutral-500'>
            {blog?.description}
          </Text>
          <Text className='mt-4 text-xs capitalize text-neutral-400'>
            {t('shared.by')}{' '}
            {isPopulated<User>(blog?.user) ? blog?.user?.name : ''} ·{' '}
            {moment(blog?.createdAt)
              .locale(locale)
              .format(locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMMM D, YYYY')}
          </Text>
        </Box>

        {canEditBlogPost(user, blog) || canDeleteBlogPost(user, blog) ? (
          <Flex
            className={`${
              isCompact
                ? 'absolute end-2 top-2 gap-2 rounded-md bg-default-background p-2'
                : 'static gap-4 self-start p-6'
            }`}
          >
            {canEditBlogPost(user, blog) && (
              <Flex
                component={Link}
                href={handleEdit()}
                onClick={(e) => e.stopPropagation()}
                className='items-center gap-2 text-neutral-700 transition-colors duration-200 hover:text-neutral-700/50'
              >
                <BiPencil size={20} />
                <span>{t('shared.actions.edit')}</span>
              </Flex>
            )}
            {canDeleteBlogPost(user, blog) && (
              <Flex
                component='button'
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setShowDeleteModal(true)
                }}
                className='items-center gap-2 text-neutral-700 transition-colors duration-200 hover:text-error-600'
              >
                <BiTrash size={20} />
                <span>{t('shared.actions.delete')}</span>
              </Flex>
            )}
          </Flex>
        ) : (
          <Flex
            className={`invisible opacity-0 ${
              isCompact
                ? 'absolute end-2 top-2 gap-2 rounded-md bg-white p-2'
                : 'static gap-4 self-start p-6'
            }`}
          >
            <Flex className='items-center gap-2 text-neutral-700 hover:text-neutral-300'>
              <BiPencil size={20} />
              <span>{t('shared.actions.edit')}</span>
            </Flex>
            <Flex
              component='button'
              className='items-center gap-2 text-neutral-700 hover:text-error-600'
            >
              <BiTrash size={20} />
              <span>{t('shared.actions.delete')}</span>
            </Flex>
          </Flex>
        )}
      </Box>
    </Card>
  )
}

export default BlogCard
