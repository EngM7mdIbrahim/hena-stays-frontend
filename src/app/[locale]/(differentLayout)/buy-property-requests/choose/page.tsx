import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import ChooseBuyPropertyRequestTypeSection from '@sections/BuyPropertyRequests/ChooseBuyPropertyRequestTypeSectiont'

import Breadcrumb from '@components/Breadcrumb'

export default function ChooseBuyPropertyRequestPage() {
  const breadCrumbList = [
    {
      label: 'Home',
      link: navigationLinks.landingPage
    },

    {
      label: 'Buy Property Requests',
      link: navigationLinks.buyPropertyRequests.allBuyPropertyRequests
    },
    {
      label: 'Choose type',
      link: navigationLinks.buyPropertyRequests.chooseBuyPropertyRequest
    }
  ]
  return (
    <Stack className='h-full gap-6 px-4 py-8 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <ChooseBuyPropertyRequestTypeSection />
    </Stack>
  )
}
