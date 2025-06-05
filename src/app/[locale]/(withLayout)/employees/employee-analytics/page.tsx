'use client'

import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import AnalyticsSection from '@sections/Analytics'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

export default function EmployeeAnalyticsPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.employees'),
      link: navigationLinks.work.employees
    },

    {
      label: t('shared.breadcrumb.employeeAnalytics'),
      link: navigationLinks.employees.employeesAnalytics
    }
  ]

  return (
    <Stack className='gap-4'>
      <Breadcrumb
        className='px-4 font-lexend md:px-8 lg:px-12'
        list={breadCrumbList}
      />
      <AnalyticsSection />
    </Stack>
  )
}
