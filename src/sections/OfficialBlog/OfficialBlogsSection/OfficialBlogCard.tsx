import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { OfficialBlog } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import {
  useDeleteBlog,
  useDeleteOfficialBlog,
  useGetUserPermissions
} from '@hooks'
import {
  Badge,
  Box,
  Card,
  Flex,
  Stack,
  Text,
  Tooltip,
  UnstyledButton
} from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'
import { BiPencil, BiTrash } from 'react-icons/bi'

import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications } from '@utils'

export interface OfficialBlogCardProps {
  officialBlog?: OfficialBlog | null
  width?: number
}

function OfficialBlogCard({ officialBlog, width }: OfficialBlogCardProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { permissions: officialBlogPermissions } = useGetUserPermissions(
    Modules.OFFICIAL_BLOGS
  )
  const { canAddOfficialBlog, canDeleteOfficialBlog, canEditOfficialBlog } =
    officialBlogPermissions

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

  const deleteOfficialBlog = useDeleteOfficialBlog({
    onSuccess: () =>
      handleDeleteSuccess(
        t('successMessages.deletedSuccessfully', {
          item: t('community.blog')
        })
      )
  })

  const handleDelete = () => {
    if (officialBlog) {
      deleteOfficialBlog.mutate({ id: officialBlog._id })
    }
  }

  const isCompact = width && width < 768 // Define "compact" based on width

  const getEditLink = () => {
    if (officialBlog) {
      return navigationLinks.admin.officialBlogs.editOfficialBlog(
        officialBlog._id
      )
    }
    return ''
  }

  const handleClick = () => {
    if (officialBlog) {
      router.push(
        navigationLinks.officialBlogs.viewOfficialBlog(
          encodeURIComponent(officialBlog.slug)
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
        loading={deleteBlog.isPending || deleteOfficialBlog.isPending}
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
            src={officialBlog?.media?.url || navigationLinks.assets.placeholder}
            alt={officialBlog?.title || 'Article Thumbnail'}
            fill
            className='h-full w-full object-cover'
          />
          {canAddOfficialBlog && (
            <Stack className='absolute left-2 top-2 gap-2'>
              <Badge>
                {officialBlog?.published
                  ? t('officialBlogs.blogStatus.published')
                  : t('officialBlogs.blogStatus.draft')}
              </Badge>
              {officialBlog?.scheduledAt && (
                <Tooltip
                  opened
                  label={`${t('officialBlogs.officialBlogForm.fields.scheduledAt')} ${moment(
                    officialBlog?.scheduledAt
                  )
                    .locale(locale)
                    .format(
                      locale.startsWith('ar')
                        ? 'D MMMM YYYY h:mm A'
                        : 'MMMM D, YYYY h:mm A'
                    )}`}
                >
                  <Badge>{t('officialBlogs.blogStatus.scheduled')}</Badge>
                </Tooltip>
              )}
            </Stack>
          )}
        </Box>

        <Box className={isCompact ? 'p-4' : 'w-full p-0'}>
          <Text
            className={`line-clamp-1 text-lg font-bold ${isCompact ? 'mt-2' : 'mt-0'}`}
            component='h3'
          >
            {officialBlog?.title}
          </Text>
          <Text className='mt-2 line-clamp-2 pr-1 text-sm text-neutral-500'>
            {officialBlog?.description}
          </Text>
          <Text className='mt-4 text-xs capitalize text-neutral-400'>
            {t('shared.by')} TrueDar ·{' '}
            {moment(officialBlog?.createdAt)
              .locale(locale)
              .format(locale.startsWith('ar') ? 'D MMMM YYYY' : 'MMMM D, YYYY')}
          </Text>
        </Box>

        {canEditOfficialBlog || canDeleteOfficialBlog ? (
          <Flex
            className={`${
              isCompact
                ? 'absolute end-2 top-2 gap-2 rounded-md bg-default-background p-2'
                : 'static gap-4 self-start p-6'
            }`}
          >
            {canEditOfficialBlog && (
              <UnstyledButton
                component={Link}
                href={getEditLink()}
                onClick={(e) => e.stopPropagation()}
                className='flex items-center gap-2 text-neutral-700 hover:text-neutral-300'
              >
                <BiPencil size={20} />
                <span>{t('shared.actions.edit')}</span>
              </UnstyledButton>
            )}
            {canDeleteOfficialBlog && (
              <UnstyledButton
                component='button'
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setShowDeleteModal(true)
                }}
                className='flex items-center gap-2 text-neutral-700 hover:text-error-600'
              >
                <BiTrash size={20} />
                <span>{t('shared.actions.delete')}</span>
              </UnstyledButton>
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

export default OfficialBlogCard
