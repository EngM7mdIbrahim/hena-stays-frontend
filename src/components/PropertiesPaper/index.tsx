import React, { useState } from 'react'
import { CloseButton, Paper, Stack, Text } from '@mantine/core'

import ShimmerButton from '@components/Buttons/ShimmerButton'
import { cn } from '@utils'

export interface PropertiesPaperProps {
  title?: string
  description?: string
  buttonTitle?: string
  buttonOnClick?: () => void
}

function PropertiesPaper({
  title,
  description,
  buttonTitle,
  buttonOnClick
}: PropertiesPaperProps) {
  const [isOpen, setIsOpen] = useState(true)
  return title && description && buttonTitle && buttonOnClick ? (
    <Paper
      className={cn('relative', isOpen ? 'block' : 'hidden')}
      shadow='sm'
      p='xl'
    >
      <CloseButton
        className='absolute end-0 top-0'
        onClick={() => setIsOpen(false)}
      />
      <Stack>
        <Text className='text-2xl font-bold'>{title}</Text>
        <Text className='w-[80%]'>{description}</Text>
        <ShimmerButton title={buttonTitle} onClick={buttonOnClick} />
      </Stack>
    </Paper>
  ) : null
}

export default PropertiesPaper
