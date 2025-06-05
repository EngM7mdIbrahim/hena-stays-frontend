import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import AddOfficialBlog from '@sections/OfficialBlog/AddOfficialBlog'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function AddOfficialBlogPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('officialBlogs.title'),
      link: navigationLinks.admin.officialBlogs.allOfficialBlogs
    },

    {
      label: t('officialBlogs.buttons.addBlog'),
      link: navigationLinks.admin.officialBlogs.addOfficialBlog
    }
  ]
  return (
    <Stack className='min-h-screen gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <AddOfficialBlog />
    </Stack>
  )
}

export default AddOfficialBlogPage
