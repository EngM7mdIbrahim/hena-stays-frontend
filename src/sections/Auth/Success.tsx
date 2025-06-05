'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LOCAL_STORAGE_KEYS, navigationLinks } from '@constants'
import { Stack, Text } from '@mantine/core'

import PrimaryButton from '@components/Buttons/PrimaryButton'

export interface SuccessProps {
  href: string
  title: string
  buttonTitle: string
  description: string
  src?: string
}

function Success({
  href,
  title,
  description,
  buttonTitle,
  src = navigationLinks.assets.successPasswordChange
}: SuccessProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.REDIRECT_URL)) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REDIRECT_URL)
    }
  }

  return (
    <Stack
      gap={15}
      className='m-0 mt-10 w-full items-center rounded-2xl bg-default-background/70 p-4 md:mt-0 md:bg-none lg:w-[80%]'
    >
      <Image src={src} alt='successful' width={250} height={250} />
      <Text
        component='h1'
        className='text-center text-lg font-bold capitalize text-neutral-800'
      >
        {title}
      </Text>
      <Text
        component='p'
        className='text-center text-md font-semibold text-neutral-500'
      >
        {description}
      </Text>

      <PrimaryButton
        onClick={handleClick}
        type='button'
        size='lg'
        className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold capitalize text-secondary'
      >
        {buttonTitle}
      </PrimaryButton>
    </Stack>
  )
}

export default Success
