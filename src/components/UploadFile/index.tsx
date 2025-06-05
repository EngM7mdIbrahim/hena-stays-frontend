'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MediaTypes } from '@commonTypes'
import { Text } from '@mantine/core'
import { CiImageOn } from 'react-icons/ci'

import { appNotifications, cn } from '@utils'

export interface UploadFileProps {
  file: File | null
  onFileChange: (file: File | null) => void
  className?: string
  placeholder?: string
  acceptPdf?: boolean
}

function UploadFile({
  file,
  onFileChange,
  className,
  placeholder = 'Upload Image',
  acceptPdf = false
}: UploadFileProps) {
  const [preview, setPreview] = useState(
    file && file?.type?.includes('image') ? URL.createObjectURL(file) : null
  )

  useEffect(() => {
    // This in case of default value that already coming with url
    if (file && file?.name?.includes('storage.googleapis.com')) {
      setPreview(file?.name)
    }
  }, [file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (
      selectedFile &&
      (selectedFile.type.includes('image/') ||
        (acceptPdf && selectedFile.type === 'application/pdf'))
    ) {
      setPreview(URL.createObjectURL(selectedFile))
      onFileChange(selectedFile)
    } else {
      appNotifications.error('Please select a valid file')
    }
  }

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview)

    setPreview(null)
    onFileChange(null)
  }

  return (
    <div className={cn('w-full', className)}>
      {!preview ? (
        <label className='flex h-[15rem] cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-default-background p-4 text-center hover:border-neutral-500'>
          <input
            type='file'
            accept={acceptPdf ? 'image/*,application/pdf' : 'image/*'}
            className='hidden'
            onChange={handleFileChange}
          />
          <div className='flex items-center justify-center gap-2'>
            <CiImageOn className='h-6 w-6' />
            <Text className='text-neutral-500'>{placeholder}</Text>
          </div>
        </label>
      ) : (
        <div className='relative h-[20rem] rounded-lg border border-dashed border-gray-300 p-4'>
          {file?.type.includes(MediaTypes.Image) ? (
            <Image
              src={preview}
              alt={file.name}
              width={400}
              height={300}
              className='h-full w-full rounded-lg object-cover'
            />
          ) : (
            <embed
              src={preview}
              type='application/pdf'
              className='h-full w-full rounded-lg'
            />
          )}
          <button
            type='button'
            onClick={removeFile}
            className='absolute right-2 top-2 w-8 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
          >
            X
          </button>
        </div>
      )}
    </div>
  )
}

export default UploadFile
