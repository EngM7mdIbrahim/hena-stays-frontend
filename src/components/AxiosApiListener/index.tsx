'use client'

import { useEffect, useState } from 'react'
import { axiosApi } from '@config'
import { useLocale } from 'next-intl'

export default function AxiosApiListener() {
  const locale = useLocale()
  const [languageInterceptor, setLanguageInterceptor] = useState<number | null>(
    null
  )

  useEffect(() => {
    if (languageInterceptor !== null) {
      axiosApi.interceptors.request.eject(languageInterceptor)
    }
    const newLanguageInterceptor = axiosApi.interceptors.request.use(
      (config) => {
        // eslint-disable-next-line no-param-reassign
        config.headers['Accept-Language'] = locale
        return config
      }
    )
    setLanguageInterceptor(newLanguageInterceptor)
    return () => {
      if (newLanguageInterceptor !== null) {
        axiosApi.interceptors.request.eject(newLanguageInterceptor)
      }
    }
  }, [locale])

  return null
}
