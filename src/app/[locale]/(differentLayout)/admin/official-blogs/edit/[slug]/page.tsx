import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import EditOfficialBlog from '@sections/OfficialBlog/EditOfficialBlog'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

export interface EditOfficialBlogPageProps {
  params: {
    slug: string
  }
}

function EditOfficialBlogPage({ params }: EditOfficialBlogPageProps) {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.officialBlogs'),
      link: navigationLinks.admin.officialBlogs.allOfficialBlogs
    },
    {
      label: t('shared.breadcrumb.editOfficialBlog'),
      link: navigationLinks.admin.officialBlogs.editOfficialBlog(
        encodeURIComponent(params.slug)
      )
    }
  ]
  return (
    <Stack className='min-h-screen gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <EditOfficialBlog slug={params.slug} />
    </Stack>
  )
}

export default EditOfficialBlogPage
