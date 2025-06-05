import React from 'react'
import { usePathname, useRouter } from '@i18n'
import { Button } from '@mantine/core'
import { useLocale } from 'next-intl'
import { BiGlobe } from 'react-icons/bi'

function LanguageButton() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const handleChangeLanguage = () => {
    router.replace(pathname, { locale: locale === 'en' ? 'ar' : 'en' })
    router.refresh()
  }

  return (
    <Button
      variant='subtle'
      color='gray'
      className='flex items-center text-sm font-medium text-default-text'
      rightSection={locale.startsWith('ar') ? <BiGlobe /> : null}
      leftSection={locale === 'en' ? <BiGlobe /> : null}
      onClick={handleChangeLanguage}
    >
      {locale.startsWith('ar') ? 'English' : 'العربية'}
    </Button>
  )
}

export default LanguageButton
