'use client'

import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaRegCopy } from 'react-icons/fa'

import { appNotifications, cn } from '@utils'

interface PaymentInfoProps {
  title: string
  textToCopy: string
  className?: string
}

function PaymentInfo({ title, textToCopy, className }: PaymentInfoProps) {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (copied) {
      appNotifications.success(t('shared.shareModal.notifications.copied'))
    }
  }, [copied])

  return (
    <Flex className={cn('items-center justify-between gap-4', className)}>
      <Box>
        <Text className='text-bg-default text-sm font-semibold'>{title}</Text>
        <Text className='text-neutral-500'>{textToCopy}</Text>
      </Box>
      <Button
        variant='transparent'
        type='button'
        className='-mt-5 shrink-0 text-blue-600 transition duration-300 ease-in-out hover:text-blue-800'
        onClick={handleCopy}
        title='Copy text'
      >
        <FaRegCopy className='h-5 w-5' />
      </Button>
    </Flex>
  )
}

export default PaymentInfo
