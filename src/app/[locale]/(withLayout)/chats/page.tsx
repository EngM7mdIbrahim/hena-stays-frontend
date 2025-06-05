import React from 'react'
import { Stack } from '@mantine/core'
import Messages from '@sections/Messages'

export const metadata = {
  title: 'Support Center | TrueDar Real Estate Assistance in UAE',
  description:
    'Get assistance and support from TrueDar’s dedicated team. Find answers to your real estate queries and enjoy seamless service through our Support Center in UAE.',
  robots: {
    index: false,
    follow: false
  }
}

function MessagesPage() {
  return (
    <Stack className='min-h-screen justify-center gap-6 px-4 md:px-12'>
      <Messages />
    </Stack>
  )
}

export default MessagesPage
