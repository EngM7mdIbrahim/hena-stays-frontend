import {
  SOCKET_EVENTS,
  SocketClientToServerMap,
  SocketServerToClientMap
} from '@commonTypes'
import { env } from '@config'
import { io, Socket } from 'socket.io-client'

import { appNotifications } from '@utils'

let socket: Socket<SocketServerToClientMap, SocketClientToServerMap> | null =
  null

export const getSocketInstance = () => {
  return socket
}

const onConnect = () => {
  appNotifications.info('Connected to socket')
}

const onDisconnect = () => {
  appNotifications.error('Disconnected from socket')
}

const onError = (error: Error) => {
  appNotifications.error(`${error.message}`)
}

const addDefaultSocketListeners = (
  currentSocket: Socket<SocketServerToClientMap, SocketClientToServerMap>
) => {
  currentSocket.on(SOCKET_EVENTS.CONNECT, onConnect)
  currentSocket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect)
  currentSocket.on(SOCKET_EVENTS.ERROR, onError)
}
const removeDefaultSocketListeners = (
  currentSocket: Socket<SocketServerToClientMap, SocketClientToServerMap>
) => {
  currentSocket.off(SOCKET_EVENTS.CONNECT, onConnect)
  currentSocket.off(SOCKET_EVENTS.DISCONNECT, onDisconnect)
  currentSocket.off(SOCKET_EVENTS.ERROR, onError)
}

export const initializeSocketInstance = (token: string) => {
  if (!socket) {
    socket = io(env.NEXT_PUBLIC_BACKEND_DOMAIN, {
      extraHeaders: {
        Authorization: token
      }
    })
    addDefaultSocketListeners(socket)
  }
  if (!socket.connected) {
    socket.connect()
  }
}

export const invalidateSocketInstance = () => {
  if (socket?.connected) {
    socket.disconnect()
  }
  if (socket) {
    removeDefaultSocketListeners(socket)
  }
  socket = null
}
