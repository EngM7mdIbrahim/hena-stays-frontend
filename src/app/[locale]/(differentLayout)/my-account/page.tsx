'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { useMediaQuery } from '@mantine/hooks'

export default function MyAccountPage() {
  const router = useRouter()
  // redirect if not mobile to settings page if not return null
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (!isMobile) {
      router.push(navigationLinks.userProfile.myAccount.profile)
    } else {
      router.push(navigationLinks.userProfile.myAccount.account)
    }
  }, [isMobile, router])

  return null
}
