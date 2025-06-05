import React from 'react'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import ContactUsSection from '@sections/ContactUsSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function ContactUsRequestsPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.users'),
      link: navigationLinks.admin.users.allUsers
    },
    {
      label: t('shared.breadcrumb.contactUsRequests'),
      link: navigationLinks.admin.users.viewContactUsRequests
    }
  ]

  return (
    <Stack className='px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <ContactUsSection />
    </Stack>
  )
}

export default ContactUsRequestsPage
