import { useRouter } from 'next/navigation'
import { User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useLinkConstructor } from '@hooks'
import { Avatar, Box, Flex, Text, UnstyledButton } from '@mantine/core'
import { BiChevronLeft } from 'react-icons/bi'

import ChatCommunicationMethods from './ChatCommunicationMethods'

export interface ChatHeaderProps {
  selectedUser: Pick<
    User,
    '_id' | 'name' | 'image' | 'email' | 'phone' | 'whatsapp' | 'chatMeta'
  >
  onBackButtonClick: () => void
  showBackButton: boolean
}

export default function ChatHeader({
  onBackButtonClick,
  selectedUser: { _id, name, image, email, phone, whatsapp, chatMeta },
  showBackButton
}: ChatHeaderProps) {
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  return (
    <Flex className='items-center justify-between gap-3 border-b p-8'>
      <Flex className='items-center gap-4'>
        {showBackButton && (
          <UnstyledButton onClick={onBackButtonClick}>
            <BiChevronLeft size={24} />
          </UnstyledButton>
        )}
        <Flex
          className='cursor-pointer items-center gap-2'
          onClick={() =>
            router.push(constructLink(navigationLinks.community.profile(_id)))
          }
        >
          <Box className='relative'>
            <Avatar src={image} name={name} alt={name} radius='xl' size='md' />
            {/* Online status */}
            {chatMeta.online && (
              <Box className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500' />
            )}
          </Box>
          <Box className='flex flex-col items-start'>
            <Text className='font-bold capitalize'>{name}</Text>
            {chatMeta.typing && (
              <Text className='text-sm text-neutral-500'>typing...</Text>
            )}
          </Box>
        </Flex>
      </Flex>

      <ChatCommunicationMethods
        email={email}
        phone={phone}
        whatsapp={whatsapp}
      />
    </Flex>
  )
}
