'use client'

import React from 'react'
import { MediaTypes, OfficialBlog } from '@commonTypes'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useGetOfficialBlogBySlug,
  useGetUserPermissions,
  useProtectRoute
} from '@hooks'
import { Box } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import OfficialBlogForm from '@sections/OfficialBlog/OfficialBlogForm'

import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'

export interface EditOfficialBlogProps {
  slug: string
}

function EditOfficialBlog({ slug }: EditOfficialBlogProps) {
  const { data, isLoading, isError, error } = useGetOfficialBlogBySlug({
    slug,
    showFields: {
      relatedBlogs: true
    }
  })

  const { permissions } = useGetUserPermissions(Modules.OFFICIAL_BLOGS)
  const isLoaded = useProtectRoute(permissions.canEditOfficialBlog)

  // Show loader while loading or if there is an error or no permission
  if (isLoading || !isLoaded) {
    return <LoaderScreen />
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  const blogToEdit = {
    ...data?.officialBlog,
    media:
      data?.officialBlog?.media &&
      new File([data.officialBlog.media.url], data.officialBlog.media.url, {
        type: MediaTypes.Image
      }),
    relatedBlogs: data?.officialBlog?.relatedBlogs?.map((blog) => {
      if (isPopulated<OfficialBlog>(blog)) {
        return {
          label: blog.title,
          value: blog._id
        }
      }
      return {}
    }),
    altText: data?.officialBlog?.media?.alt,
    scheduledAt: data?.officialBlog?.scheduledAt
      ? new Date(data?.officialBlog?.scheduledAt)
      : null,
    faq: data?.officialBlog?.faq.map((faq) => {
      return {
        question: faq.question,
        answer: faq.answer,
        key: randomId()
      }
    })
  }

  return (
    <Box>
      <OfficialBlogForm isEdit defaultValues={blogToEdit} />
    </Box>
  )
}

export default EditOfficialBlog
