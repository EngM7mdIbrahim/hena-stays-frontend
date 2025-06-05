import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useUser } from './useUser'

export function useShouldRedirect(flag: boolean, redirectLink: string) {
  const router = useRouter()
  const { loading } = useUser()
  useEffect(() => {
    if (flag && !loading) {
      router.push(redirectLink)
    }
  }, [flag, redirectLink, router, loading])
}
