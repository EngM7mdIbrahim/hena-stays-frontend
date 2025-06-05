'use client'

import { useCallback, useEffect } from 'react'
import {
  SOCKET_EVENTS,
  SocketClientToServerMap,
  SocketServerToClientMap
} from '@commonTypes'
import { getSocketInstance } from '@services'
import { Socket } from 'socket.io-client'

import { appNotifications } from '@utils'

interface UseSocketIOProps {
  onNewMessage?: SocketServerToClientMap[typeof SOCKET_EVENTS.NEW_MESSAGE]
  onDeleteMessage?: SocketServerToClientMap[typeof SOCKET_EVENTS.DELETE_MESSAGE]
  onUserOnline?: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_ONLINE]
  onUserOffline?: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_OFFLINE]
  onUserTyping?: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_TYPING]
  onUserStopTyping?: SocketServerToClientMap[typeof SOCKET_EVENTS.USER_STOP_TYPING]
}

export function useSocketIO({
  onNewMessage,
  onDeleteMessage,
  onUserOnline,
  onUserOffline,
  onUserTyping,
  onUserStopTyping
}: UseSocketIOProps = {}) {
  const socket = getSocketInstance()

  const initializeSocketEventListeners = useCallback(
    (
      currentSocket: Socket<
        SocketServerToClientMap,
        SocketClientToServerMap
      > | null
    ) => {
      if (!currentSocket) {
        return
      }
      if (onNewMessage) {
        currentSocket.on(SOCKET_EVENTS.NEW_MESSAGE, onNewMessage)
      }
      if (onDeleteMessage) {
        currentSocket.on(SOCKET_EVENTS.DELETE_MESSAGE, onDeleteMessage)
      }
      if (onUserOnline) {
        currentSocket.on(SOCKET_EVENTS.USER_ONLINE, onUserOnline)
      }
      if (onUserOffline) {
        currentSocket.on(SOCKET_EVENTS.USER_OFFLINE, onUserOffline)
      }
      if (onUserTyping) {
        currentSocket.on(SOCKET_EVENTS.USER_TYPING, onUserTyping)
      }
      if (onUserStopTyping) {
        currentSocket.on(SOCKET_EVENTS.USER_STOP_TYPING, onUserStopTyping)
      }
    },
    [socket, onNewMessage, onDeleteMessage, onUserOnline, onUserOffline]
  )

  const invalidateSocketEventListeners = useCallback(
    (
      currentSocket: Socket<
        SocketServerToClientMap,
        SocketClientToServerMap
      > | null
    ) => {
      if (!currentSocket) {
        return
      }
      if (onNewMessage) {
        currentSocket.off(SOCKET_EVENTS.NEW_MESSAGE, onNewMessage)
      }
      if (onDeleteMessage) {
        currentSocket.off(SOCKET_EVENTS.DELETE_MESSAGE, onDeleteMessage)
      }
      if (onUserOnline) {
        currentSocket.off(SOCKET_EVENTS.USER_ONLINE, onUserOnline)
      }
      if (onUserOffline) {
        currentSocket.off(SOCKET_EVENTS.USER_OFFLINE, onUserOffline)
      }
      if (onUserTyping) {
        currentSocket.off(SOCKET_EVENTS.USER_TYPING, onUserTyping)
      }
      if (onUserStopTyping) {
        currentSocket.off(SOCKET_EVENTS.USER_STOP_TYPING, onUserStopTyping)
      }
    },
    [socket, onNewMessage, onDeleteMessage, onUserOnline, onUserOffline]
  )

  const emitEvent: {
    <Ev extends keyof SocketClientToServerMap>(
      event: Ev,
      ...args: Parameters<SocketClientToServerMap[Ev]>
    ): void
  } = useCallback(
    (event, ...args) => {
      if (!socket?.connected) {
        appNotifications.error(
          'You are not connected to the internet, please check your connection'
        )
        return
      }
      socket.emit(event, ...args)
    },
    [socket]
  )

  useEffect(() => {
    initializeSocketEventListeners(socket)
    return () => {
      invalidateSocketEventListeners(socket)
    }
  }, [initializeSocketEventListeners, invalidateSocketEventListeners, socket])

  return { emitEvent }
}

export default useSocketIO
