'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { useCreateCreditsWithCard } from '@hooks/query'
import CheckoutStatus from '@components/CheckoutStatus'
import { appNotifications } from '@utils'

function CheckoutCallback() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get(SEARCH_PARAM_KEYS.SUCCESS_KEY)
  const credits = searchParams.get(SEARCH_PARAM_KEYS.CREDITS_KEY)
  const paymentMethod = searchParams.get(SEARCH_PARAM_KEYS.PAYMENT_METHOD_KEY)
  const returnUrl =
    searchParams.get(SEARCH_PARAM_KEYS.RETURN_URL_KEY) ||
    window.location.origin + navigationLinks.subscription.checkoutCallback

  const { mutate: createCreditsWithCard } = useCreateCreditsWithCard({
    onSuccess: ({ url }) => {
      appNotifications.success(t('checkout.success.title'))
      router.push(url)
    }
  })

  const handleTryAgain = () => {
    if (!credits) {
      appNotifications.error(t('checkout.error.goToPremium'))
      return
    }
    createCreditsWithCard({
      credits: +credits,
      returnUrl: decodeURIComponent(returnUrl)
    })
  }

  return (
    <Flex className='m-auto w-[80%] items-center justify-center px-4 py-10 md:w-[60%] lg:w-[40%]'>
      <CheckoutStatus
        onTryAgain={handleTryAgain}
        status={success === 'true' || false}
        isBankTransfer={paymentMethod === 'bank'}
      />
    </Flex>
  )
}

export default CheckoutCallback
