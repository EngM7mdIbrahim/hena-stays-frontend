import { Flex, Skeleton } from '@mantine/core'

import { cn } from '@utils'

import { ChatMessageProps } from './ChatMessage'

function ChatMessageSkeleton({ isUser }: Pick<ChatMessageProps, 'isUser'>) {
  return (
    <Flex className={cn(isUser ? 'justify-end' : 'justify-start', 'mb-4 p-4')}>
      <Skeleton
        height={48}
        width={192}
        className={cn(
          'max-w-[70%]',
          isUser
            ? 'rounded-t-full rounded-es-full'
            : 'rounded-t-full rounded-ee-full'
        )}
      />
    </Flex>
  )
}

export default ChatMessageSkeleton
