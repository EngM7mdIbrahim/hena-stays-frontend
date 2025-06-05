'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Box, CloseButton } from '@mantine/core'

export interface MessageMediaPreviewProps {
  file: File
  onRemove: (file: File) => void
}

export default function MessageMediaPreview({
  file,
  onRemove
}: MessageMediaPreviewProps) {
  const isVideo = useMemo(() => file.type.startsWith('video/'), [file])
  const url = useMemo(() => URL.createObjectURL(file), [file])

  return (
    <Box className='relative'>
      {isVideo ? (
        <video
          src={url}
          width={200}
          height={200}
          controls
          className='rounded-lg object-cover'
        >
          <track kind='captions' />
        </video>
      ) : (
        <Image
          src={url}
          alt={file.name}
          width={200}
          height={200}
          className='rounded-lg object-cover'
        />
      )}
      <CloseButton
        className='absolute -right-2 -top-2 rounded-full bg-white shadow-md'
        onClick={() => onRemove(file)}
      />
    </Box>
  )
}
