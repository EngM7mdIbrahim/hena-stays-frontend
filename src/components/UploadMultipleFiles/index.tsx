'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'
import { CiImageOn } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'

import { cn } from '@utils'

export interface FileItem {
  file: File
  preview: string
}

export interface UploadMultipleFilesProps {
  onFilesChange: (files: FileItem[]) => void
  className?: string
  value?: FileItem[]
}

function UploadMultipleFiles({
  onFilesChange,
  value,
  className
}: UploadMultipleFilesProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileItem[]>(value || [])
  const t = useTranslations()
  useEffect(() => {
    setFiles(value || [])
  }, [value])

  // Handles file selection and updates state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : []
    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles) // Update local state
    setTimeout(() => onFilesChange(updatedFiles), 0) // Notify parent outside render phase

    // Clear the input value to allow reselecting the same file
    const input = event.target
    input.value = ''
  }

  // Handles file removal
  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles) // Update local state
    setTimeout(() => onFilesChange(updatedFiles), 0) // Notify parent outside render phase
  }

  // Drag-and-drop functionality
  const handleDragStart =
    (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('text/plain', index.toString())
    }

  const handleDrop =
    (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const draggedIndex = parseInt(
        event.dataTransfer.getData('text/plain'),
        10
      )
      if (draggedIndex !== index) {
        const reorderedFiles = [...files]
        const draggedFile = reorderedFiles.splice(draggedIndex, 1)[0]
        reorderedFiles.splice(index, 0, draggedFile)
        setFiles(reorderedFiles) // Update local state
        setTimeout(() => onFilesChange(reorderedFiles), 0) // Notify parent outside render phase
      }
    }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault()

  const handleClickOnDiv = () => {
    if (files.length === 0) inputRef.current?.click()
  }

  const handleClickLabel = () => {
    inputRef.current?.click()
  }

  return (
    <Box
      role='button'
      className={cn(
        'relative h-[300px] overflow-y-auto rounded-md border-2 border-dashed border-neutral-400 bg-default-background p-4',
        files.length === 0 ? 'cursor-pointer' : 'cursor-default',
        className
      )}
      onClick={handleClickOnDiv}
    >
      <Box className='space-y-4'>
        <Flex className='flex-wrap gap-4'>
          {files.map((file, index) => (
            <Box
              key={file.file.name}
              className='relative h-40 w-40 cursor-move rounded-lg border border-neutral-400 p-2'
              draggable
              onDragStart={handleDragStart(index)}
              onDrop={handleDrop(index)}
              onDragOver={handleDragOver}
            >
              {file?.file?.type.includes('image') ? (
                <Image
                  src={file.preview}
                  alt={`Uploaded file ${index}`}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-lg'
                />
              ) : (
                <video
                  controls
                  className='h-full w-full rounded-lg object-cover'
                >
                  <track default kind='captions' src='SUBTITLE_PATH' />
                  <source src={file.preview} type='video/mp4' />
                  Your browser does not support the video.
                </video>
              )}
              <button
                type='button'
                className='absolute right-1 top-1 rounded-full bg-error-500 p-2 text-white'
                onClick={() => handleRemoveFile(index)}
              >
                <IoClose size={16} />
              </button>
            </Box>
          ))}

          {files.length === 0 && (
            <Flex className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform items-center gap-1 text-default-text/55'>
              <CiImageOn />
              {t('shared.placeholders.media')}
            </Flex>
          )}

          {files.length > 0 && (
            <Flex
              className='h-40 w-40 items-center justify-center rounded-lg border border-neutral-400'
              onClick={handleClickLabel}
            >
              <button
                type='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClickLabel()}
                className='flex h-full w-full cursor-pointer items-center justify-center border-0 text-neutral-500'
              >
                <BiPlus aria-hidden size={24} />
                <span className='sr-only'>Add file</span>
              </button>
            </Flex>
          )}
          <input
            ref={inputRef}
            type='file'
            multiple
            accept='image/*, video/*'
            onChange={handleFileChange}
            className='hidden'
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default UploadMultipleFiles
