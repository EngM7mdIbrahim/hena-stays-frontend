'use client'

import { useEffect, useMemo } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { SEARCH_PARAM_KEYS } from '@constants'

import LoaderScreen from '@components/LoaderScreen'
import { constructNotificationLink } from '@utils'

export default function NotificationCallbackPage() {
  const searchParams = useSearchParams()

  const type = useMemo(
    () => searchParams.get(SEARCH_PARAM_KEYS.TYPE_KEY),
    [searchParams]
  )
  const payload = useMemo(
    () => searchParams.get(SEARCH_PARAM_KEYS.PAYLOAD_KEY),
    [searchParams]
  )
  const router = useRouter()
  const notificationLink = useMemo(() => {
    if (!type || !payload) {
      return null
    }
    return constructNotificationLink(type, JSON.parse(payload))
  }, [type, payload])

  useEffect(() => {
    if (notificationLink) {
      router.push(notificationLink)
    }
  }, [notificationLink, router])

  // We should keep this condition to be notificationLink === undefined
  // because we want to redirect to the landing page if the notificationLink is undefined ONLY
  // as this indicates there is an error in the notificationLink generation
  if (!type || !payload || notificationLink === undefined) {
    notFound()
  }

  return <LoaderScreen />
}
