import React from 'react'
import { Box, Text } from '@mantine/core'
import { FaBoxOpen } from 'react-icons/fa'

import { cn } from '@utils'

interface EmptyWrapperProps {
  icon?: React.ReactNode
  iconSize?: number
  description?: string
  descriptionClassName?: string
}

function EmptyWrapper({
  iconSize = 200,
  icon = <FaBoxOpen size={iconSize} />,
  description = 'No data available',
  descriptionClassName
}: EmptyWrapperProps) {
  return (
    <Box className='flex h-[70%] flex-col items-center justify-center gap-2'>
      {icon}
      <Text
        className={cn(
          'text-center text-3xl text-neutral-600',
          descriptionClassName
        )}
      >
        {description}
      </Text>
    </Box>
  )
}

export default EmptyWrapper
