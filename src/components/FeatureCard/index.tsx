'use client'

import { Stack, StackProps, Text } from '@mantine/core'

import { cn } from '@utils'

export interface FeatureCardProps {
  icon: JSX.Element
  title: string
}

function FeatureCard({
  icon,
  title,
  className,
  ...rest
}: FeatureCardProps & StackProps) {
  return (
    <Stack
      {...rest}
      className={cn(
        'items-center justify-center gap-2 rounded-md border border-gray-300 p-4',
        className
      )}
    >
      <div>{icon}</div>
      <Text className='text-neutral-700'>{title}</Text>
    </Stack>
  )
}

export default FeatureCard
