'use client'

import Image from 'next/image'
import { navigationLinks } from '@constants'
import { isDark } from '@guards'
import { Box, useMantineColorScheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useLocale } from 'next-intl'

export default function LandingBackgroundImage() {
  const locale = useLocale()
  const isMobileOrTablet = useMediaQuery('(max-width: 768px)')
  const { colorScheme } = useMantineColorScheme()
  let src
  if (!isDark(colorScheme)) {
    if (isMobileOrTablet && locale === 'en') {
      src = navigationLinks.assets.landing.headerBackgroundPhone
    } else if (!isMobileOrTablet && locale.startsWith('ar')) {
      src = navigationLinks.assets.landing.headerBackgroundAr
    } else {
      src = navigationLinks.assets.landing.headerBackground
    }
  } else if (locale.startsWith('ar')) {
    src = navigationLinks.assets.landing.headerBackgroundDarkAr
  } else {
    src = navigationLinks.assets.landing.headerBackgroundDark
  }
  return (
    <Box className='relative -top-4 -z-10 h-[40dvh] w-full md:absolute md:h-full'>
      <Image src={src} alt='header' objectFit='cover' fill />
    </Box>
  )
}
