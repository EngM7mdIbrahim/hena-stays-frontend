'use client'

import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { Flex, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import RegisterImage from '@components/RegisterImage'

export function AuthLayout({ children }: PropsWithChildren) {
  const mediaQuery = useMediaQuery('(max-width: 768px)')

  const t = useTranslations()

  return (
    <Flex className='relative'>
      <Stack
        px={20}
        py={55}
        align='center'
        justify='center'
        pos='relative'
        className='mobile-bg w-full bg-opacity-30'
      >
        {children}
        {mediaQuery && (
          <>
            <Flex
              top={0}
              className='absolute end-0 items-center rounded-b-xl bg-secondary p-6'
            >
              <Image
                src={navigationLinks.assets.logo}
                width={50}
                height={50}
                alt='Logo'
              />
            </Flex>
            <Text
              component='p'
              pos='absolute'
              className='block text-sm text-secondary md:hidden'
              bottom={0}
              left={0}
            >
              {t('auth.footer.copyRight')}
            </Text>
          </>
        )}
      </Stack>

      <Text
        component='p'
        pos='absolute'
        className='hidden text-sm md:block'
        c='dimmed'
        bottom={10}
        left={10}
      >
        {t('auth.footer.copyRight')}
      </Text>

      <RegisterImage
        title={t('auth.banner.title')}
        description={t('auth.banner.description')}
      />
    </Flex>
  )
}
