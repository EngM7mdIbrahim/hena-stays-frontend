import React from 'react'
import { Box, Button, Text } from '@mantine/core'

export interface ShimmerButtonProps {
  onClick: () => void
  title: string
}

function ShimmerButton({ title, onClick }: ShimmerButtonProps) {
  return (
    <Button
      size='md'
      onClick={onClick}
      className='$ relative inline-flex items-center justify-center overflow-hidden rounded-md border border-white/20 bg-primary px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(246,166,73,0.6)]'
    >
      <Text className='relative z-10 text-lg'>{title}</Text>

      {/* Shimmer layer - always animating */}
      <Box className='absolute inset-0 z-0'>
        <Box className='animate-shimmer absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)]'>
          <Box className='relative h-full w-10 bg-white/30' />
        </Box>
      </Box>

      {/* Bottom glow on hover */}
      <Box className='absolute bottom-0 left-0 h-1 w-full bg-white/30 opacity-0 transition-opacity duration-300 group-hover/button:opacity-100' />
    </Button>
  )
}

export default ShimmerButton
