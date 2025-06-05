'use client'

import { PropsWithChildren } from 'react'
import { Notifications } from '@mantine/notifications'

import AxiosApiListener from '@components/AxiosApiListener'
import ErrorTracer from '@components/ErrorTracer'

import MantineProvider from './MantineProvider'
import { ReactQueryProvider } from './ReactQueryProvider'
import ServiceWorkerProvider from './ServiceWorkerProvider'
import { SocketProvider } from './SocketProvider'
import { StateProvider } from './state-provider'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <StateProvider>
        <MantineProvider>
          <Notifications />
          <ErrorTracer />
          <AxiosApiListener />
          <ServiceWorkerProvider>
            <SocketProvider>{children}</SocketProvider>
          </ServiceWorkerProvider>
        </MantineProvider>
      </StateProvider>
    </ReactQueryProvider>
  )
}
