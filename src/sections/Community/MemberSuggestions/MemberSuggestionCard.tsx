import React from 'react'
import { User } from '@commonTypes'
import { Box, Card, Stack, Text } from '@mantine/core'

import UserCard from '@components/UserCard'

export interface MemberSuggestionCardProps {
  title: string
  items: User[]
}

function MemberSuggestionCard({ title, items }: MemberSuggestionCardProps) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder className='h-fit'>
      <Text fw={500} mb='md'>
        {title}
      </Text>
      <Stack gap='sm'>
        {items.map((member, index) => (
          <>
            <Box key={member._id}>
              <UserCard showRate={false} user={member} />
            </Box>
            {index !== items.length - 1 && (
              <div className='ml-auto h-[1px] w-[80%] bg-gray-300' />
            )}
          </>
        ))}
      </Stack>
    </Card>
  )
}

export default MemberSuggestionCard
