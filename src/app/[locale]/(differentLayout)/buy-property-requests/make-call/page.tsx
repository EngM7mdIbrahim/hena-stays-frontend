import { navigationLinks } from '@constants'
import { Stack, Text } from '@mantine/core'
import MakeCallRequest from '@sections/MakeCallRequest'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function MakeCallRequestPage() {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.propertyRequests'),
      link: navigationLinks.buyPropertyRequests.chooseBuyPropertyRequest
    },
    {
      label: t('shared.breadcrumb.makeACall'),
      link: navigationLinks.buyPropertyRequests.makeCall
    }
  ]
  return (
    <Stack className='h-full gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <Text className='w-full text-default-text/75 md:max-w-3xl'>
        {t('buyPropertyRequests.makeACallForm.description')}
      </Text>
      <MakeCallRequest />
    </Stack>
  )
}

export default MakeCallRequestPage
