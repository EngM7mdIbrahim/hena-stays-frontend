import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'

import { ProtectAction } from '@interfaces'

import { useLinkConstructor } from './useLinkConstructor'

export function useProtectAction() {
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  const protectAction = useCallback(
    ({
      redirectUrl,
      action
    }: {
      redirectUrl?: string
      action?: ProtectAction
    }) => {
      const currentRedirectUrl = redirectUrl || window.location.pathname
      router.push(
        constructLink(navigationLinks.auth.signIn, {
          [SEARCH_PARAM_KEYS.RETURN_URL_KEY]: encodeURIComponent(
            !action
              ? currentRedirectUrl
              : constructLink(currentRedirectUrl, {
                  [SEARCH_PARAM_KEYS.ENTITY_KEY]: action.entity,
                  [SEARCH_PARAM_KEYS.ACTION_KEY]: action.action,
                  [SEARCH_PARAM_KEYS.ID_KEY]: action.id
                })
          )
        })
      )
    },
    [constructLink, router, window.location.pathname]
  )

  return protectAction
}
