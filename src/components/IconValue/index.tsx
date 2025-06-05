import { Box, Text } from '@mantine/core'

import { Direction } from '@interfaces'
import { cn } from '@utils'

export interface IconValueProps {
  icon: React.ReactNode
  value: string | number
  wrapperClassName?: string
  textClassName?: string
  direction?: Direction
}

export default function IconValue({
  icon,
  value,
  wrapperClassName,
  textClassName,
  direction = 'row'
}: IconValueProps) {
  return (
    <Box
      className={cn(
        'flex items-center gap-1',
        direction === 'row' ? 'flex-row' : 'flex-col',
        wrapperClassName
      )}
    >
      {icon}
      <Text className={cn('text-base', textClassName)}>{value}</Text>
    </Box>
  )
}
