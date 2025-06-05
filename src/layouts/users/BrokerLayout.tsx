import { PropsWithChildren } from 'react'
import { LinksKeys } from '@enums'
import { Box } from '@mantine/core'

import NavigationLayout from '@layouts/NavigationLayout'
import Footer from '@components/Footer'

export function BrokerLayout({ children }: PropsWithChildren) {
  return (
    <NavigationLayout
      links={[
        LinksKeys.Home,
        LinksKeys.Properties,
        LinksKeys.Projects,
        LinksKeys.PropertyRequests,
        LinksKeys.Leads,
        LinksKeys.Messages,
        LinksKeys.SellForMe,
        LinksKeys.Community,
        LinksKeys.OfficialBlogs,

        LinksKeys.Analytics
      ]}
      specialLinks={[LinksKeys.Support, LinksKeys.Settings]}
    >
      {children}
      <Box className='mt-8'>
        <Footer />
      </Box>
    </NavigationLayout>
  )
}
