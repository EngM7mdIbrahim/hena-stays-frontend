import { PropsWithChildren } from 'react'
import { LinksKeys } from '@enums'
import { Box } from '@mantine/core'

import Footer from '@components/Footer'
import Navbar from '@components/Navbars/Navbar'

export function UserLayout({ children }: PropsWithChildren) {
  return (
    <Box className='min-h-screen'>
      <Navbar
        links={[
          LinksKeys.Home,
          LinksKeys.PropertyRequests,
          LinksKeys.Properties,
          LinksKeys.Community,
          LinksKeys.OfficialBlogs,

          LinksKeys.ForCompaniesAgents
        ]}
      />
      {children}
      <Footer />
    </Box>
  )
}
