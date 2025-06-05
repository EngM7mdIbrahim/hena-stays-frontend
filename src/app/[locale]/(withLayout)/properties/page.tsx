import React from 'react'
import { Stack } from '@mantine/core'
import PropertiesSection from '@sections/Properties/PropertiesSection'

export const metadata = {
  title: 'All Properties | TrueDar Real Estate Listings in UAE',
  description:
    'Browse a wide range of real estate listings in UAE on TrueDar. Find the perfect home, office, or investment property with trusted brokers and seamless search tools.',
  robots: {
    index: true,
    follow: true
  }
}

function PropertiesPage() {
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <PropertiesSection />
    </Stack>
  )
}

export default PropertiesPage
