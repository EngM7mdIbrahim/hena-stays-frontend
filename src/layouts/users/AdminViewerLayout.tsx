'use client'

import { PropsWithChildren } from 'react'
import { LinksKeys } from '@enums'
import { Box } from '@mantine/core'

import NavigationLayout from '@layouts/NavigationLayout'
import Footer from '@components/Footer'

export function AdminViewerLayout({ children }: PropsWithChildren) {
  return (
    <NavigationLayout
      links={[
        LinksKeys.Home,
        LinksKeys.Messages,
        LinksKeys.AdminProperties,
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
