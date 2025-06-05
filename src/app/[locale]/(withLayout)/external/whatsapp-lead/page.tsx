'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LeadsContactsTypesEnum } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { useCreateLead, useDefaultSupportUser } from '@hooks'
import { Box, Flex, Text } from '@mantine/core'
import { useLocale } from 'next-intl'

import LoaderScreen from '@components/LoaderScreen'
import { appNotifications } from '@utils'

export default function WhatsappLeadPage() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const id = searchParams.get(SEARCH_PARAM_KEYS.ID_KEY)
  const priceValue = searchParams.get(SEARCH_PARAM_KEYS.PRICE_VALUE_KEY)
  const name = searchParams.get(SEARCH_PARAM_KEYS.NAME_KEY)
  const ownerWhatsapp = searchParams.get(SEARCH_PARAM_KEYS.OWNER_WHATSAPP_KEY)
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { defaultSupportUser } = useDefaultSupportUser()
  const baseUrl = window.location.href
    ? (window.location.href.split(/(?<=[a-z0-9])\/(?=[a-z0-9])/).at(0) ?? '')
    : ''

  const currentUrl = `${baseUrl}${navigationLinks.properties.viewProperty(id ?? '')}`
  const getWhatsappLink = useCallback(
    (leadId: string | null) => {
      const isArabic = locale?.startsWith('ar')

      if (isArabic) {
        return `https://api.whatsapp.com/send?phone=${ownerWhatsapp ?? defaultSupportUser?.whatsapp}&text=مرحبًا,%0A أريد الحصول على مزيد من المعلومات عن هذا العقار:%0A*${name}* %0A*السعر:* ${priceValue} AED%0A*الرابط:*%0A${currentUrl}%0Aأي تغييرات في هذه الرسالة ستؤدي إلى عدم إرسال الاستفسار إلى الوكيل.${leadId ? `%0Aالمرجع: ${leadId}` : ''}`
      }
      return `https://api.whatsapp.com/send?phone=${ownerWhatsapp ?? defaultSupportUser?.whatsapp}&text=Hello,%0A I would like to get more information about this property:%0A*${name}* %0A*Price:* ${priceValue} AED%0A*Link:*%0A${currentUrl}%0AAny changes made to this message will result in the enquiry not being sent to the agent.${leadId ? `%0AReference: ${leadId}` : ''}`
    },
    [name, currentUrl, priceValue, ownerWhatsapp]
  )
  const createLead = useCreateLead({
    onSuccess: ({ lead }) => {
      router.push(getWhatsappLink(lead?._id))
    },
    onError: () => {
      setError('Something went wrong! Please try again later.')
    }
  })

  useEffect(() => {
    const dataToSend = {
      property: id || '',
      contactType: LeadsContactsTypesEnum.whatsapp
    }
    if (id && priceValue && name) {
      if (!ownerWhatsapp) {
        createLead.mutate(dataToSend)
      } else {
        router.push(getWhatsappLink(null))
      }
    } else {
      appNotifications.error('unauthorized request')
      router.push(navigationLinks.landingPage)
    }
  }, [])

  if (!error) <LoaderScreen />

  return (
    <Flex className='flex h-screen items-center justify-center'>
      <Box className='text-center'>
        <Text className='text-2xl font-bold'>{error}</Text>
      </Box>
    </Flex>
  )
}
