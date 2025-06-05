import React from 'react'
import Image from 'next/image'
import { Box, Container, Flex, Stack, Text } from '@mantine/core'

import HeaderSection from '@components/HeaderSection'

export interface WhyUsCardProps {
  src: string
  title: string
  description: string
}

function WhyUsCard({ src, title, description }: WhyUsCardProps) {
  return (
    <Flex className='mx-auto w-full gap-4 md:w-[80%] lg:w-[70%]'>
      <Image
        width={20}
        height={20}
        src={src}
        alt={title}
        className='h-12 w-12'
      />
      <Stack className='flex-1 gap-0'>
        <Text className='text-lg font-semibold'>{title}</Text>
        <Text className='text-[14px] font-semibold text-gray-500'>
          {description}
        </Text>
      </Stack>
    </Flex>
  )
}

function WhyUs() {
  const cards = [
    {
      src: '/svgs/about/why1.svg',
      title: 'Qualified Leads Only',
      description:
        'Receive requests from clients who already know what they want. No more cold calling—just warm, ready-to-buy leads.'
    },
    {
      src: '/svgs/about/why2.svg',
      title: 'Save Time and Resources',
      description:
        'Focus on closing deals instead of searching for clients. Our system connects you with serious buyers, streamlining your workflow.'
    },
    {
      src: '/svgs/about/why3.svg',
      title: 'Increase Your Sales',
      description:
        "With clients coming to you with specific requests, you'll experience a higher conversion rate and more successful sales."
    },
    {
      src: '/svgs/about/why4.svg',
      title: 'Exclusive Opportunities',
      description:
        'Be the first to access new client requests in your area, giving you a competitive edge.'
    }
  ]

  return (
    <Container className='space-y-12'>
      <HeaderSection
        title='People choose us because we serve the best for everyone '
        badgeTitle='Why Us'
        badgeClassName='m-auto'
        titleClassName='mx-auto lg:w-[70%] text-center'
      />

      <Box className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {cards.map((card) => (
          <WhyUsCard
            key={card.title}
            src={card.src}
            title={card.title}
            description={card.description}
          />
        ))}
      </Box>
    </Container>
  )
}

export default WhyUs
