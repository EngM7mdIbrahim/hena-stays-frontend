import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import SavedPropertiesSection from '@sections/Properties/SavedPropertiesSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function SavedPropertiesPage() {
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
      label: t('shared.breadcrumb.savedProperties'),
      link: navigationLinks.properties.savedProperties
    }
  ]

  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <SavedPropertiesSection />
    </Stack>
  )
}

export default SavedPropertiesPage
