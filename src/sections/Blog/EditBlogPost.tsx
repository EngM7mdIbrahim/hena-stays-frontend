'use client'

import React from 'react'
import { Blog } from '@commonTypes'
import { Modules } from '@enums'
import { useGetBlogById, useGetUserPermissions, useProtectRoute } from '@hooks'
import { Box } from '@mantine/core'
import BlogForm from '@sections/Blog/BlogForm'

import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'

export interface EditBlogPostProps {
  blogId: string
}

function EditBlogPost({ blogId }: EditBlogPostProps) {
  const { data, isLoading, isError, error } = useGetBlogById({ id: blogId })
  const { permissions } = useGetUserPermissions(Modules.COMMUNITY)
  const isLoaded = useProtectRoute(permissions.canEditBlogPost, data?.blog)

  if (isError) {
    return <FullScreenError error={error} />
  }

  const blogToEdit = {
    ...data?.blog,
    media: data?.blog?.media.map((mediaItem) => ({
      file: new File([mediaItem.url], mediaItem.url, {
        type: mediaItem.type
      }),
      preview: mediaItem.url
    }))
  }

  // Show loader while loading or if no permission
  if (isLoading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box>
      <BlogForm isEdit blog={blogToEdit as unknown as Blog} />
    </Box>
  )
}

export default EditBlogPost
