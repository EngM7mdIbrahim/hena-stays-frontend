'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { ActionIcon, Flex, Text } from '@mantine/core'
import { useLocale } from 'next-intl'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

// TitleLogoOnlyNavbar

export interface NavbarSecondaryProps {
  pageTitle: string
}

function NavbarSecondary({ pageTitle }: NavbarSecondaryProps) {
  const router = useRouter()
  const locale = useLocale()
  return (
    <Flex className='items-center justify-between gap-3 border-b border-neutral-400 px-2 py-2 sm:px-4 md:px-10'>
      <ActionIcon
        title='Back'
        onClick={() => router.back()}
        variant='filled'
        className='rounded-full bg-neutral-200 text-default-text'
        aria-label='back'
        size={40}
      >
        {locale.startsWith('ar') ? <BiChevronRight /> : <BiChevronLeft />}
      </ActionIcon>
      <Text component='h1' className='text-lg font-bold sm:text-xl md:text-2xl'>
        {pageTitle}
      </Text>
      <Flex
        onClick={() => router.push(navigationLinks.landingPage)}
        className='relative -top-[17px] cursor-pointer items-center rounded-b-[32px] bg-secondary p-6 pt-12'
      >
        <Image
          src={navigationLinks.assets.logo}
          width={80}
          height={80}
          alt='Logo'
        />
      </Flex>
    </Flex>
  )
}

export default NavbarSecondary
