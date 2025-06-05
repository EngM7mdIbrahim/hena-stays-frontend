'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import OfficialBlogForm from '@sections/OfficialBlog/OfficialBlogForm'

import LoaderScreen from '@components/LoaderScreen'

function AddOfficialBlog() {
  const { permissions } = useGetUserPermissions(Modules.OFFICIAL_BLOGS)
  const isLoaded = useProtectRoute(permissions.canAddOfficialBlog)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <OfficialBlogForm />
}

export default AddOfficialBlog
