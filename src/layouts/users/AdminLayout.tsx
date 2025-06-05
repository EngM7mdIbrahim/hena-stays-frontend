'use client'

import { PropsWithChildren } from 'react'
import { LinksKeys } from '@enums'
import { Box } from '@mantine/core'

import NavigationLayout from '@layouts/NavigationLayout'
import Footer from '@components/Footer'

export function AdminLayout({ children }: PropsWithChildren) {
  return (
    <NavigationLayout
      links={[
        LinksKeys.AdminAnalytics,
        LinksKeys.AdminUsers,
        LinksKeys.CreditRequests,
        LinksKeys.Transactions,
        LinksKeys.AdminProperties,
        LinksKeys.Messages,
        LinksKeys.AdminProjects,
        LinksKeys.AdminOfficialBlogs,
        LinksKeys.PropertyRequests,
        LinksKeys.SellForMe,
        LinksKeys.Leads,
        LinksKeys.Community
      ]}
      specialLinks={[LinksKeys.Settings]}
    >
      {children}
      <Box className='mt-8'>
        <Footer />
      </Box>
    </NavigationLayout>
  )
}
