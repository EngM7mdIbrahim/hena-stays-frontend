import React from 'react'
import { Flex, Loader } from '@mantine/core'

import { cn } from '@utils'

export interface LoaderScreenProps {
  className?: string
}
function LoaderScreen({ className }: LoaderScreenProps) {
  return (
    <Flex className={cn('h-screen items-center justify-center', className)}>
      <Loader />
    </Flex>
  )
}

export default LoaderScreen
