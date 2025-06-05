'use client'

import { Box, Button, Group, Text, Title } from '@mantine/core'

export interface ErrorWithStatusCodeProps {
  onButtonClick: () => void
  title: string
  description: string
  statusCode: number
  buttonText: string
}

export default function ErrorWithStatusCode({
  onButtonClick,
  title,
  description,
  statusCode,
  buttonText
}: ErrorWithStatusCodeProps) {
  return (
    <Box className='mx-0 flex h-[95dvh] w-full max-w-none items-center justify-center p-2'>
      <div className='relative'>
        <Text className='absolute inset-0 flex items-center justify-center text-[200px] font-black text-secondary/40 dark:text-primary sm:text-[600px]'>
          {statusCode}
        </Text>
        <div className='relative z-10 pt-[220px] sm:pt-[120px]'>
          <Title className='text-center text-[38px] font-black sm:text-[32px]'>
            {title}
          </Title>
          <Text
            size='lg'
            ta='center'
            className='mx-auto mb-[calc(var(--mantine-spacing-xl)*1.5)] mt-[--mantine-spacing-xl] max-w-[460px]'
          >
            {description}
          </Text>
          <Group justify='center'>
            <Button size='md' variant='white' onClick={onButtonClick}>
              {buttonText}
            </Button>
          </Group>
        </div>
      </div>
    </Box>
  )
}
