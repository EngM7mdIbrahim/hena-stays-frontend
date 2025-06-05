import React from 'react'
import Image from 'next/image'
import { Container, Flex, Stack, Text } from '@mantine/core'

function AboutHeader() {
  return (
    <Container size='lg'>
      <Stack className='items-center justify-center text-center'>
        <Text
          component='h1'
          className='text-xl font-bold text-neutral-700 md:text-4xl'
        >
          About our company
        </Text>
        <Text component='p' className='m-auto max-w-xl text-neutral-600'>
          Lorem ipsum dolor sit amet consectetur adipiscing eli, Interdum ullam
          corper sed pharetra sene.
        </Text>
        <Container className='space-y-8'>
          <Image
            src='/images/about/truedar-about.png'
            alt='about'
            width={1000}
            height={1000}
          />
          <Flex className='w-full flex-wrap gap-3 text-left'>
            <Text component='h2' className='w-full text-2xl font-bold md:w-1/4'>
              What we do
            </Text>
            <Stack className='flex-1 text-left text-neutral-800'>
              <Text>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                ,,The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, unlike the usage.
              </Text>
              <Text>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                ,,The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, unlike the usage.
              </Text>
            </Stack>
          </Flex>
        </Container>
      </Stack>
    </Container>
  )
}

export default AboutHeader
