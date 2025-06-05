'use client'

import { useState } from 'react'
import { Chat, ChatTypes } from '@commonTypes'
import { useCreateChat } from '@hooks'
import { UnstyledButton } from '@mantine/core'
import { useTranslations } from 'next-intl'

export interface HelpCenterButtonProps {
  handleSelectChat: (chat: Chat) => void
}

export default function HelpCenterButton({
  handleSelectChat
}: HelpCenterButtonProps) {
  const t = useTranslations()
  const [supportChat, setSupportChat] = useState<Chat | null>(null)
  const { mutate: createChat } = useCreateChat({
    onSuccess: (chatResponse) => {
      const { chat } = chatResponse
      handleSelectChat(chat)
      setSupportChat(chat)
    }
  })

  const handleHelpCenter = () => {
    if (supportChat) {
      handleSelectChat(supportChat)
    } else {
      createChat({
        type: ChatTypes.SUPPORT
      })
    }
  }

  return (
    <UnstyledButton
      onClick={handleHelpCenter}
      className='w-full rounded-md text-primary'
    >
      {t('chat.helpCenter')}
    </UnstyledButton>
  )
}
