import Link from 'next/link'
import { navigationLinks } from '@constants'
import { ActionIcon, Flex } from '@mantine/core'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegEnvelope, FaWhatsapp } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'

import Actions from '@components/Actions'

export interface ChatCommunicationMethodsProps {
  email: string
  phone: string
  whatsapp: string
}

export default function ChatCommunicationMethods({
  email,
  phone,
  whatsapp
}: ChatCommunicationMethodsProps) {
  // actions
  const menuItems = [
    {
      label: 'Email',
      icon: <FaRegEnvelope />,
      onClick: () => {
        window.open(navigationLinks.methodsCommunication.email(email) || '')
      }
    },
    {
      label: 'Whatsapp',
      icon: <FaWhatsapp />,
      onClick: () => {
        window.open(
          navigationLinks.methodsCommunication.whatsapp(whatsapp) || ''
        )
      }
    },
    {
      label: 'Call',
      icon: <FiPhone />,
      onClick: () => {
        window.open(navigationLinks.methodsCommunication.call(phone) || '')
      }
    }
  ]
  return (
    <>
      <Flex className='hidden items-center gap-4 lg:flex'>
        <ActionIcon
          radius='md'
          component={Link}
          target='_blank'
          href={navigationLinks.methodsCommunication.email(email) || ''}
          className='bg-default-background text-primary'
          size={36}
        >
          <FaRegEnvelope />
        </ActionIcon>
        <ActionIcon
          radius='md'
          component={Link}
          target='_blank'
          href={navigationLinks.methodsCommunication.whatsapp(whatsapp) || ''}
          className='bg-default-background text-primary'
          size={36}
        >
          <FaWhatsapp />
        </ActionIcon>
        <ActionIcon
          radius='md'
          component={Link}
          target='_blank'
          href={navigationLinks.methodsCommunication.call(phone) || ''}
          className='bg-default-background text-primary'
          size={36}
        >
          <FiPhone />
        </ActionIcon>
      </Flex>

      <Actions
        items={menuItems}
        targetTrigger={
          <ActionIcon
            onClick={(e) => e.stopPropagation()}
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg lg:hidden'
          >
            <BsThreeDotsVertical />
          </ActionIcon>
        }
      />
    </>
  )
}
