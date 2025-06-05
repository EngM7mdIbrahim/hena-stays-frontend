'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Avatar, Box, CloseIcon } from '@mantine/core'
import { TfiPencil } from 'react-icons/tfi'

import { appNotifications, cn } from '@utils'

export interface UploadUserImageProps {
  file: File | null
  onFileChange: (file: File | null) => void
  className?: string
}

function UploadUserImage({
  file,
  onFileChange,
  className
}: UploadUserImageProps) {
  const [preview, setPreview] = useState(
    file && file?.type?.includes('image') ? URL.createObjectURL(file) : null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (file && file?.name?.includes('storage.googleapis.com')) {
      setPreview(file?.name)
    }
  }, [file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.includes('image/')) {
      const url = URL.createObjectURL(selectedFile)
      setPreview(url)
      onFileChange(selectedFile)
    } else {
      appNotifications.error('Please select an image')
    }
    const input = e.target
    input.value = ''
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveAvatar = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    onFileChange(null)
  }

  return (
    <div className={cn('w-full', className)}>
      <input
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      <Box className='relative mx-auto w-fit gap-2'>
        <Avatar size={120} src={preview || ''} />

        <ActionIcon
          type='button'
          onClick={preview ? handleRemoveAvatar : handleAvatarClick}
          className={cn('bg-neutral200 absolute shadow-lg', {
            'right-0 top-0': preview,
            'bottom-0 right-0': !preview
          })}
          size='lg'
          radius='xl'
        >
          {preview ? (
            <CloseIcon className='h-4 w-4' />
          ) : (
            <TfiPencil className='h-4 w-4' />
          )}
        </ActionIcon>
      </Box>
    </div>
  )
}

export default UploadUserImage
