import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported, Messaging } from 'firebase/messaging'

import { appNotifications } from '@utils'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}

// Initialize Firebase only in the browser
export const app = initializeApp(firebaseConfig)

let messaging: Messaging | null = null

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app)
    } else {
      if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
        appNotifications.error(
          'Firebase Messaging is not supported on this browser.'
        )
      }
    }
  })
}

export const getMessagingInstance = () => messaging
