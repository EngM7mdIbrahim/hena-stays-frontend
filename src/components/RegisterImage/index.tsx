'use client'

import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { Box, Flex, Stack, Text } from '@mantine/core'

import { cn } from '@utils'

export interface RegisterImageProps {
  title: string
  description: string

  className?: string
}

function RegisterImage({ title, description, className }: RegisterImageProps) {
  return (
    <Box
      className={cn(
        'relative me-auto hidden min-h-screen w-full overflow-hidden md:block',

        className
      )}
    >
      <Image
        src={navigationLinks.assets.general}
        alt='truedar register image'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <Flex
        top={0}
        className='absolute end-[32px] items-center rounded-b-xl bg-secondary p-6'
      >
        <Image
          src={navigationLinks.assets.logo}
          width={100}
          height={100}
          alt='Logo'
        />
      </Flex>
      <Stack gap={3} className='absolute bottom-8 start-8'>
        <Text component='h1' className='text-4xl font-bold text-white'>
          {title}
        </Text>
        <Text
          component='p'
          className='w-full text-md text-white lg:w-[70%] lg:text-lg'
        >
          {description}
        </Text>
      </Stack>
    </Box>
  )
}

export default RegisterImage
