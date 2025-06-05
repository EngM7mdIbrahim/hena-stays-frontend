'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getMessagingInstance } from '@config'
import { COOKIE_KEYS, navigationLinks } from '@constants'
import { getToken, onMessage } from 'firebase/messaging'
import Cookies from 'js-cookie' // Import for handling cookies
import { useTranslations } from 'next-intl'

import { appNotifications, constructNotificationLink } from '@utils'

import { useSoundPlay } from './useSoundPlay'

export function useFirebaseMessaging() {
  const t = useTranslations()
  const router = useRouter()
  const playSound = useSoundPlay(navigationLinks.assets.incomingMessageAlert)
  useEffect(() => {
    if (typeof window === 'undefined') return // Prevent SSR issues

    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const currentRegistration =
            await navigator.serviceWorker.getRegistration(
              '/firebase-messaging-sw.js'
            )
          if (!(currentRegistration && currentRegistration.active)) {
            await navigator.serviceWorker.register('/firebase-messaging-sw.js')
          } else {
            if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
              appNotifications.info('Service Worker already registered.')
            }
          }
        } catch (err) {
          if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
            appNotifications.error(
              `❌ Service Worker registration failed: ${err}`
            )
          }
        }
      }
    }

    const requestPermission = async () => {
      if ('Notification' in window && typeof window !== 'undefined') {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          try {
            const messaging = getMessagingInstance()
            if (!messaging) {
              if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
                appNotifications.error('Firebase messaging not initialized.')
              }
              return
            }
            const token = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY
            })

            if (token) {
              Cookies.set(COOKIE_KEYS.FCM_TOKEN, token)
              appNotifications.info(
                t('notifications.notificationPermissionGranted')
              )
            } else {
              appNotifications.error(
                t('notifications.noRegistrationTokenAvailable')
              )
            }
          } catch (error) {
            // console.error('Error retrieving FCM token:', error)
            appNotifications.error(`Error retrieving FCM token: ${error}`)
          }
        } else {
          appNotifications.error(
            t('notifications.notificationPermissionDenied')
          )
        }
      }
    }

    // In case the user is online and active on the device, this is our worker function for handling notifications.
    // Service workers won't work right now, but we can use this for future reference.
    const messaging = getMessagingInstance()
    if (messaging) {
      onMessage(messaging, ({ notification, data }) => {
        const { title, body, image } = notification || {}
        const { type, ...payload } = data || {}
        const notificationLink = constructNotificationLink(type, payload)
        playSound()
        appNotifications.info({
          title: title ?? 'New Notification',
          body,
          image,
          onClick: () => {
            if (notificationLink) {
              router.push(notificationLink)
            }
          }
        })
      })
    }

    // Run all setup functions
    registerServiceWorker()
    requestPermission()
  }, [])
}
