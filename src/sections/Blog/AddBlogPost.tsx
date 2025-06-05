'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import BlogForm from '@sections/Blog/BlogForm'

import LoaderScreen from '@components/LoaderScreen'

function AddBlogPost() {
  const { permissions } = useGetUserPermissions(Modules.COMMUNITY)
  const isLoaded = useProtectRoute(permissions.canCreateBlogPost)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <BlogForm />
}

export default AddBlogPost
