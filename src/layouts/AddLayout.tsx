'use client'

import { PropsWithChildren, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { useLinkConstructor, useUser } from '@hooks'
import { Stack } from '@mantine/core'

import NavbarSecondary, {
  NavbarSecondaryProps
} from '@components/Navbars/NavbarSecondary'
import { cn } from '@utils'

export interface AddLayoutProps
  extends PropsWithChildren<NavbarSecondaryProps> {
  containerWidth?: string
  containerClassName?: string
}

export function AddLayout({
  children,
  pageTitle,
  containerWidth = '62%',
  containerClassName
}: AddLayoutProps) {
  const router = useRouter()
  const { user, loading } = useUser()
  const { constructLink } = useLinkConstructor()
  const pathname = usePathname()

  useEffect(() => {
    if (
      !loading &&
      !user &&
      !pathname?.includes(
        navigationLinks.buyPropertyRequests.allBuyPropertyRequests
      )
    ) {
      router.push(
        constructLink(navigationLinks.auth.signIn, {
          [SEARCH_PARAM_KEYS.RETURN_URL_KEY]: encodeURIComponent(
            window.location.pathname
          )
        })
      )
    }
  }, [loading, user, router])

  if (
    !loading &&
    !user &&
    !pathname?.includes(
      navigationLinks.buyPropertyRequests.allBuyPropertyRequests
    )
  ) {
    return null
  }

  return (
    <Stack className='gap-8'>
      <NavbarSecondary pageTitle={pageTitle} />

      <Stack
        style={{ width: '100%', maxWidth: containerWidth, minWidth: '300px' }}
        className={cn('m-auto min-h-screen justify-center', containerClassName)}
      >
        {children}
      </Stack>
    </Stack>
  )
}
