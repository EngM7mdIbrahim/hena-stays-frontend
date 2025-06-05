'use client'

import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import OwnerPropertiesSection from '@sections/Properties/OwnerPropertiesSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function MyPropertiesPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.properties.allProperties
    },

    {
      label: t('shared.breadcrumb.myProperties'),
      link: navigationLinks.properties.myListings
    }
  ]
  return (
    <Stack className='min-h-screen gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <OwnerPropertiesSection />
    </Stack>
  )
}

export default MyPropertiesPage
