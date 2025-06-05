import { PropsWithChildren } from 'react'
import { LinksKeys } from '@enums'
import { Box } from '@mantine/core'

import NavigationLayout from '@layouts/NavigationLayout'
import Footer from '@components/Footer'

export function SupportLayout({ children }: PropsWithChildren) {
  return (
    <NavigationLayout
      links={[LinksKeys.Home, LinksKeys.AdminUsers, LinksKeys.Messages]}
    >
      {children}
      <Box className='mt-8'>
        <Footer />
      </Box>
    </NavigationLayout>
  )
}
